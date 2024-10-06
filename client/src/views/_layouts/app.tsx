import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { api } from '../../services/axios'
import { verifyTokenSaved } from '../../utils/verifyToken'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const userLogged = verifyTokenSaved();
    if (!userLogged) {
      navigate('/sign-in', { replace: true });
    }

    const interceptorId = api.interceptors.response.use((response) => response, (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

  return (
    <Outlet />
  )
}
