import './global.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { queryClient } from './services/react-query'
import { router } from './routes'

export function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
  )
}