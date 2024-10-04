import { Toaster } from "react-hot-toast";

export function Toast(){
  return(
    <Toaster position="top-right" reverseOrder={true} toastOptions={{
      duration: 5000,
      style: {
        padding: '8px 10px',
        borderRadius: '4px'
      },
      success: {
        style: {
          backgroundColor: '#2D7575',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '400'
        }
      },
      error: {
        style: {
          backgroundColor: '#E61E32',
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: '400'
        }
      }
    }} />
  )
}