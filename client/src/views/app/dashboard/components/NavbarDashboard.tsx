import { HomeIcon } from "@heroicons/react/16/solid";

export function NavbarDashboard(){
  return (
    <div className='flex items-center gap-4 mt-12 px-8'>
      <div className='flex items-center gap-2'>
        <HomeIcon className='w-5 h-5' color='#8E9595' />
        <span className='text-sm text-gray-600 font-medium'>Home</span>
      </div>
      <span className='text-sm text-gray-600 font-medium'>/</span>
      <span className='text-sm text-gray-600 font-medium'>Gestão</span>
      <span className='text-sm text-gray-600 font-medium'>/</span>
      <span className='text-sm text-green-600 font-medium'>Controle de Estoque</span>
    </div>
  )
}