import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid'
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../services/axios';
import ReactLoading from 'react-loading';
import { User } from '../../../../hooks/fetchUserData';
import { ModalDeleteUser } from './ModalDeleteUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function TableUsers() {
  const navigate = useNavigate();

  const [idUsuarioSelected, setIdUsuarioSelected] = useState<string | undefined>(undefined);
  const [showModalDelete, setShowModalDelete] = useState(false);
  
  const { data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get('/accounts');
      return response.data
      }
  });

  function redirectToUserProfile(id: string){
    navigate(`/user/${id}`, { replace: true })
  }

  function handleShowModal(idUsuario?: string | undefined) {
      if(idUsuario){
        setIdUsuarioSelected(idUsuario);
      }

      setShowModalDelete(showModalDelete => !showModalDelete);
  }

  return (
    <>
      {data ? (
        <>
          <div className="relative overflow-x-auto">
            <table className="w-[65%] mx-auto my-8 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm font-bold text-black">
                <tr>
                  <th scope="col" className="px-6 py-3">Foto</th>
                  <th scope="col" className="px-6 py-3">Nome</th>
                  <th scope="col" className="px-6 py-3">CPF</th>
                  <th scope="col" className="px-6 py-3">Cargo</th>
                  <th scope="col" className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user: User) => (
                  <tr key={user.id} className="border-b-gray-1000 border-b-2">
                    <th scope="row" className="px-6 py-4 text-black text-sm font-normal">
                      <img
                        src={user.photoUrl}
                        alt=""
                        className="aspect-video w-14 h-14 rounded-full object-cover border-2 border-green-600"
                      />
                    </th>
                    <td className="px-6 py-4 text-black text-sm font-normal">{user.name}</td>
                    <td className="px-6 py-4 text-black text-sm font-normal">{user.cpf}</td>
                    <td className="px-6 py-4 text-black text-sm font-normal">{user.position}</td>
                    <td className="px-6 py-4 flex gap-4">
                      <button type="button" className='p-2 bg-green-600 rounded-full text-white disabled:cursor-not-allowed disabled:opacity-50' onClick={() => redirectToUserProfile(user.id)}>
                        <PencilIcon className='w-5 h-5' />
                      </button>
                      <button type="button" className='p-2 bg-red-600 rounded-full disabled:cursor-not-allowed disabled:opacity-50' onClick={() => handleShowModal(user.id)}>
                        <TrashIcon className='w-5 h-5 text-white' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showModalDelete && <ModalDeleteUser idUser={idUsuarioSelected!} showModal={() => handleShowModal()} />}
        </>
      ) : (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <ReactLoading
            className="w-fit"
            type="spinningBubbles"
            color="#2D7575"
            height="80px"
            width="100px"
          />
        </div>
      )}
    </>
  )
}
