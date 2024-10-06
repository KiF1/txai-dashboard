import Login from '../../assets/login.svg'
import Background from '../../assets/background.png'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { verifyTokenSaved } from '../../utils/verifyToken'

export function AuthLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const userLogged = verifyTokenSaved();
    if (userLogged) {
      navigate('/', { replace: true })
    }
  }, [navigate]);
  
  return (
    <section className="w-full h-screen grid grid-cols-2">
      <div 
        className='w-full bg-contain bg-center h-screen  flex justify-center items-center'
        style={{ backgroundImage: `url(${Background})` }}
        >
          <div className='min-h-[460px] flex flex-col items-end'>
            <strong className='font-bold text-[40px] text-white'>Bem-vindo!</strong>
            <img src={Login} className='w-fit h-fit' />
          </div>
      </div>
      <div className='w-full bg-white h-screen flex justify-center items-center'>
        <Outlet />
      </div>
    </section>
  )
}
