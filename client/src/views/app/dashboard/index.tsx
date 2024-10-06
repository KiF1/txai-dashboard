import { PlusIcon, UserIcon } from '@heroicons/react/16/solid'
import Copyright from '../../../assets/copyright.svg'
import { useState } from 'react'
import { ModalCreate } from './components/ModalCreate'
import { HeaderDashboard } from './components/HeaderDashboard'
import { NavbarDashboard } from './components/NavbarDashboard'
import { TableProducts } from './components/TableProducts'
import { useNavigate } from 'react-router-dom'
import { fetchUserData } from '../../../hooks/fetchUserData'
import { TableUsers } from './components/TableUsers'

   
export function Dashboard(){
  const [showModalCreate, setShowModalCreate] = useState(false);

  const navigate = useNavigate()
  const { data: userLogged } = fetchUserData();
  if(!userLogged){
    navigate('/sign-in', { replace: true })
  }

  function handleShowModal(){
      setShowModalCreate(showModalCreate => !showModalCreate)
  }

  function navigateToCreaterUser(){
    navigate('/register', { replace: true })
  }

  return(
    <section className="w-full flex flex-col">
      <HeaderDashboard />
      <NavbarDashboard />
      {userLogged?.position === 'admin' && (
        <>
          <h1 className='text-2xl text-black font-bold px-4 py-2 border-b-4 border-b-green-600 my-12 mx-auto'>Controle de Usuários</h1>
          <button onClick={() => navigateToCreaterUser()} type='button' className='bg-green-600 w-fit rounded-[3px] flex items-center px-6 py-4 gap-2 text-white font-medium text-sm my-6 mx-8'>
            <UserIcon color='#FFFFFF' className='w-4 h-4' />
            Cadastrar novo usuário
          </button>
          <TableUsers />
        </>
      )}
      <h1 className='text-2xl text-black font-bold px-4 py-2 border-b-4 border-b-green-600 my-12 mx-auto'>Controle de Estoque</h1>
      <button onClick={() => handleShowModal()} type='button' className='bg-green-600 w-fit rounded-[3px] flex items-center px-6 py-4 gap-2 text-white font-medium text-sm my-6 mx-8'>
        <PlusIcon color='#FFFFFF' className='w-4 h-4' />
        Cadastrar novo produto
      </button>
      <TableProducts />
      {showModalCreate && <ModalCreate showModal={() => handleShowModal()} />}
      <div className='flex flex-col justify-center items-center gap-4 mt-12 mb-6'>
        <div className='flex items-center gap-2'>
          <strong className='text-xs text-black font-light'>Copyright</strong>
          <img src={Copyright} className='w-fit h-fit' />
          <strong className='text-xs text-black font-light'>2023 Sistema Gerencial Txai 5.0. Todos os direitos reservados</strong>
        </div>
        <div className='flex items-center gap-4'>
          <a href='#' className='text-sm text-gray-600 font-light underline'>Site Institucional</a>
          <a href='#' className='text-sm text-gray-600 font-light underline'>Política de privacidade</a>
        </div>
      </div>
    </section>
  )
}