import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { api } from '../../services/axios'

export function AppLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    console.log(token)
    if (!token) {
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
