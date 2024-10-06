import Logo from '../../../../assets/logo.svg'
import MenuHamburguer from '../../../../assets/hamburguer.svg'
import { QuestionMarkCircleIcon, CalendarDaysIcon, BellIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../../../services/react-query';
import { User } from '../../../../hooks/fetchUserData';


export function HeaderDashboard(){
  const navigate = useNavigate();
  const cachedUser = queryClient.getQueryData<User>(["user"]);

  function redirectToUserProfile(){
    navigate(`/user/${cachedUser?.id}`, { replace: true })
  }

  function logoutUser(){
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    queryClient.clear();
    navigate('/sign-in', { replace: true });
  }
  
  return (
    <div className="w-full flex justify-between items-center px-8 py-10 border-b-2 border-b-gray-1000">
      <div className="flex gap-8 items-center">
        <button className="w-6 h-6 bg-transparent border-0">
          <img src={MenuHamburguer} className="w-6 h-6"/>
        </button>
        <img src={Logo} className='w-fit h-fit' />
      </div>
      <div className='flex items-center gap-8'>
        <div className='flex items-center gap-2'>
          <QuestionMarkCircleIcon className='w-5 h-5' color='#262F2F' />
          <span className='text-sm text-black font-normal'>Suporte</span>
        </div>
        <div className='flex items-center gap-2'>
          <CalendarDaysIcon className='w-5 h-5' color='#262F2F' />
          <span className='text-sm text-black font-normal'>Acessar Calendário</span>
        </div>
        <div className='flex relative'>
          <BellIcon color='#2D7575' className='w-5 h-5' />
          <div className='w-2 h-2 rounded-full bg-red-600 absolute top-0 right-0' />
        </div>
        <button onClick={redirectToUserProfile} className='flex items-center gap-2 bg-transparent border-0'>
          <img src={cachedUser?.photoUrl} className='w-8 h-8 rounded-full border-2 border-red-600' />
          <span className='text-sm text-black font-normal'>{cachedUser?.name}</span>
        </button>
        <button type="button" onClick={logoutUser} className='py-1 px-4 bg-red-600 gap-2 text-white text-sm font-normal rounded flex items-center'>
          Sair
          <ArrowRightEndOnRectangleIcon className='w-4 h-4 text-white' />
        </button>
      </div>
    </div>
  )
}