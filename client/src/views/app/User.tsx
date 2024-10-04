import { ArrowUturnLeftIcon, CameraIcon } from '@heroicons/react/16/solid'
import Logo from '../../assets/logo.svg'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export function User(){
  return(
    <section className='w-full h-screen flex justify-center items-center bg-[#F8F8F8]'>
      <div className='w-[65%] flex flex-col gap-6'>
        <img src={Logo} className='w-fit h-fit' />
        <div className='flex flex-col gap-2'>
          <strong className="text-3xl text-black font-bold">Faça seu cadastro</strong>
          <span className='text-sm text-gray-600 font-normal'>*Campos obrigatórios</span>
        </div>
        <label htmlFor="media" className="w-fit flex cursor-pointer items-end gap-1.5 text-sm text-green-600 rounded-md" >
            <div className='flex relative'>
              <div className='w-14 h-14 flex justify-center items-center bg-blue-600 rounded-full'>
                <span className='text-4xl text-white text-center'>S</span>
              </div>
              <div className='w-6 h-6 flex justify-centera items-center bg-white rounded-full absolute bottom-[-10px] p-1 right-0'>
                <CameraIcon color='#2D7575' />
              </div>
            </div>
            Carregar foto
        </label>
        <div className='w-full flex flex-col gap-4 mt-12'>
          <div className='w-full grid grid-cols-3 gap-4'>
            <Input label='Nome completo' placeholder='Insira seu nome completo' isMandatory />
            <Input label='CPF' placeholder='Insira seu CPF, somente os números' isMandatory />
            <Input label='E-mail' placeholder='Insira seu melhor e-mail' isMandatory />
          </div>
          <div className='w-full grid grid-cols-3 gap-4'>
            <Input label='Nome de usuário' placeholder='Insira um nome para o usuário' isMandatory />
            <Input label='Senha' placeholder='Insira uma senha' isMandatory />
            <Input label='Confirmar senha' placeholder='Insira novamente a senha' isMandatory />
          </div>
          <div className='w-full grid grid-cols-3 gap-4'>
            <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
              *Cargo
              <select className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600">
                <option value="">Selecionar cargo</option>
                <option value="1">Administrador</option>
                <option value="2">Usuário</option>
              </select>
            </label>
          </div>
        </div>
        <div className='flex justify-end items-center gap-8'>
          <button type='button' className='flex items-center gap-2 text-gray-600 font-sm font-normal'>
            <ArrowUturnLeftIcon className='w-4 h-4' color='#8E9595' />
            Voltar ao Login
          </button>
          <Button size='200px' text='Concluir Cadastro' />
        </div>
      </div>
    </section>
  )
}