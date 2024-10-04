import { BarsArrowUpIcon, ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, PencilIcon, TrashIcon, BarsArrowDownIcon } from '@heroicons/react/16/solid'
import DeAZ from '../../../../assets/az.svg'
import { useEffect, useState } from 'react';
import { ModalDelete } from './ModalDelete';
import { ModalEdit } from './ModalEdit';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../services/axios';
import { queryClient } from '../../../../services/react-query';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  createdAt: string;
  creatorId: string;
}

interface FetchProducts {
  products: Product[];
  totalProducts: number;
}

export function TableProducts() {
  const [totalPages, setTotalPages] = useState(0)
  const [pageActive, setPageActive] = useState(1);
  const [orderByDate, setOrderByDate] = useState('desc')
  const [orderByAphabetic, setOrderByAphabetic] = useState('asc')
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const { data, isPending } = useQuery<FetchProducts>({
    queryKey: ["products", pageActive, orderByDate, orderByAphabetic],
    queryFn: async () => {
      const response = await api.get(`/products?page=${pageActive}&orderByDate=${orderByDate}&orderByAlphabetic=${orderByAphabetic}`);
      console.log(response.data.totalProducts)
      setTotalPages(Math.ceil(response.data.totalProducts / 10));

      return response.data;
    },
  });

  function handleFilterByDate(order: string) {
    setOrderByDate(order);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  function handleFilterByAlphabetic(order: string) {
    setOrderByAphabetic(order);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }

  function handleShowModal(state: string) {
    if (state === 'edit') {
      setShowModalEdit(showModalEdit => !showModalEdit);
    } else {
      setShowModalDelete(showModalDelete => !showModalDelete);
    }
  }

  function handleChangePage(page: number) {
    if (page > 0 && page <= totalPages) {
      setPageActive(page);
    }
  }

  return (
    <>
      <div className='flex items-center justify-between px-8 my-12'>
        <div className='flex items-center gap-6'>
          {orderByDate === 'desc' ? (
            <div className='flex items-center gap-2'>
              <button type='button' onClick={() => handleFilterByDate('asc')} className='text-base text-black bg-transparent border-0 font-normal underline'>
                Mais Recentes primeiro
              </button>
              <BarsArrowUpIcon color='#262F2F' className='w-5 h-5' />
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <button type='button' onClick={() => handleFilterByDate('desc')} className='text-base text-black bg-transparent border-0 font-normal underline'>
                Mais Recentes primeiro
              </button>
              <BarsArrowDownIcon color='#262F2F' className='w-5 h-5' />
            </div>
          )}

          {orderByAphabetic === 'asc' ? (
            <div className='flex items-center gap-2'>
              <button type='button' onClick={() => handleFilterByAlphabetic('desc')} className='text-base text-black bg-transparent border-0 font-normal underline'>
                De A a Z
              </button>
              <img src={DeAZ} className='w-5 h-5 text-black' />
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <button type='button' onClick={() => handleFilterByAlphabetic('asc')} className='text-base text-black bg-transparent border-0 font-normal underline'>
                De Z a A
              </button>
              <img src={DeAZ} className='w-5 h-5 text-black transfor rotate-180' />
            </div>
          )}
        </div>
        <strong className='text-black font-medium text-sm'>Mostrando {pageActive} - 10 de {data?.totalProducts}</strong>
        <div className='flex items-center gap-4'>
          <button type='button' onClick={() => handleChangePage(1)} className='text-sm text-black bg-transparent border-0 font-normal' disabled={pageActive === 1}>
            <ChevronDoubleLeftIcon className='w-5 h-5' color={pageActive === 1 ? '#B9C6C6' : '#262F2F'} />
          </button>
          <button type='button' onClick={() => handleChangePage(pageActive - 1)} className='text-sm text-black bg-transparent border-0 font-normal' disabled={pageActive === 1}>
            <ChevronLeftIcon className='w-5 h-5' color={pageActive === 1 ? '#B9C6C6' : '#262F2F'} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              type='button'
              onClick={() => handleChangePage(i + 1)}
              className={`text-sm ${pageActive === i + 1 ? 'text-white bg-green-600' : 'text-black bg-transparent'} border-0 font-medium w-8 h-8 rounded-full`}
            >
              {i + 1}
            </button>
          ))}
          <button type='button' onClick={() => handleChangePage(pageActive + 1)} className='text-sm text-black bg-transparent border-0 font-normal' disabled={pageActive === totalPages}>
            <ChevronRightIcon className='w-5 h-5' color={pageActive === totalPages ? '#B9C6C6' : '#262F2F'} />
          </button>
          <button type='button' onClick={() => handleChangePage(totalPages)} className='text-sm text-black bg-transparent border-0 font-normal' disabled={pageActive === totalPages}>
            <ChevronDoubleRightIcon className='w-5 h-5' color={pageActive === totalPages ? '#B9C6C6' : '#262F2F'} />
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-[65%] mx-auto my-8 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm font-bold text-black">
            <tr>
              <th scope="col" className="px-6 py-3">Data Cadastro</th>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">Quantidade</th>
              <th scope="col" className="px-6 py-3">Valor</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          {/* Corpo */}
          <tbody>
            {data?.products.map((product) => (
              <tr key={product.id} className="border-b-gray-1000 border-b-2">
                <th scope="row" className="px-6 py-4 text-black text-sm font-normal">{product.createdAt}</th>
                <td className="px-6 py-4 text-black text-sm font-normal">{product.name}</td>
                <td className="px-6 py-4 text-black text-sm font-normal">{product.price}</td>
                <td className="px-6 py-4 text-black text-sm font-normal">${product.quantity}</td>
                <td className="px-6 py-4 flex gap-4">
                  <button type="button" className='p-2 bg-green-600 rounded-full text-white' onClick={() => handleShowModal('edit')}>
                    <PencilIcon className='w-5 h-5' />
                  </button>
                  <button type="button" className='p-2 bg-red-600 rounded-full' onClick={() => handleShowModal('delete')}>
                    <TrashIcon className='w-5 h-5 text-white' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-between items-center px-8 my-12'>
        <div />
        <div />
        <strong className='text-black font-medium text-sm'>Mostrando {pageActive} - 10 de {data?.totalProducts}</strong>
        <div className='flex items-center gap-4'>
          <button type='button' onClick={() => handleChangePage(1)} className='text-sm text-black bg-transparent border-0 font-normal' disabled={pageActive === 1}>
            <ChevronDoubleLeftIcon className='w-5 h-5' color={pageActive === 1 ? '#B9C6C6' : '#262F2F'} />
          </button>
          <button type='button' onClick={() => handleChangePage(pageActive - 1)} className='text-sm text-black bg-transparent border-0 font-normal' disabled={pageActive === 1}>
            <ChevronLeftIcon className='w-5 h-5' color={pageActive === 1 ? '#B9C6C6' : '#262F2F'} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              type='button'
              onClick={() => handleChangePage(i + 1)}
              className={`text-sm ${pageActive === i + 1 ? 'text-white bg-green-600' : 'text-black bg-transparent'} border-0 font-medium w-8 h-8 rounded-full`}
            >
              {i + 1}
            </button>
          ))}
          <button type='button' onClick={() => handleChangePage(pageActive + 1)} className='text-sm text-black bg-transparent border-0 font-normal' disabled={pageActive === totalPages}>
            <ChevronRightIcon className='w-5 h-5' color={pageActive === totalPages ? '#B9C6C6' : '#262F2F'} />
          </button>
          <button type='button' onClick={() => handleChangePage(totalPages)} className='text-sm text-black bg-transparent border-0 font-normal' disabled={pageActive === totalPages}>
            <ChevronDoubleRightIcon className='w-5 h-5' color={pageActive === totalPages ? '#B9C6C6' : '#262F2F'} />
          </button>
        </div>
      </div>
      {showModalEdit ? <ModalEdit showModal={() => handleShowModal('edit')} /> : <></>}
      {showModalDelete ? <ModalDelete showModal={() => handleShowModal('delete')} /> : <></>}
    </>
  )
}
