import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './views/_layouts/app'
import { AuthLayout } from './views/_layouts/auth'
import { SignIn } from './views/auth/sign-in'
import { Dashboard } from './views/app/dashboard'
import { CreateUser } from './views/app/user/CreateUser'
import { EditUser } from './views/app/user/EditUser'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/user/:id',
        element: <EditUser />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      }
    ],
  },
  {
    path: '/register',
    element: <CreateUser />
  }
])