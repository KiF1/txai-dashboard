import { ArrowUturnLeftIcon, CameraIcon } from '@heroicons/react/16/solid'
import Logo from '../../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../../services/axios'
import toast from 'react-hot-toast'
import { Toast } from '../../../components/Toast'
import { verifyTokenSaved } from '../../../utils/verifyToken'

const createAccountFormSchema = z.object({
  name: z.string().min(1, { "message": "Informe o apelido usuário" }),
  fullName: z.string().min(1, { "message": "Informe o nome do usuário" }),
  email: z.string().email({ "message": "Informe um e-mail válido" }),
  cpf: z.string().min(11, { "message": "Informe o cpf do usuário" }),
  password: z.string().min(6, { "message": "Informe uma senha com no mínimo 6 caracteres" }),
  position: z.string().min(1, { "message": "Informe o cargo do Usuário"}),
  photoUrl: z.instanceof(File)
});

type CreateAccountForm = z.infer<typeof createAccountFormSchema>;

export function CreateUser(){
  const navigate = useNavigate()
  const userLogged = verifyTokenSaved();

  const [passwordsNotEquals, setPasswordsNotEquals] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preview, setPreview] = useState<string | null>(null)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountFormSchema)
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateAccountForm) => {
      const passwordEqualConfirm = confirmPassword === data.password;
      if(passwordEqualConfirm){
        const uploadFormData = new FormData()
        uploadFormData.set('file', data.photoUrl)
  
        const uploadResponse = await api.post('/upload', uploadFormData);
        const photoUrl = uploadResponse.data.photoUrl;
        const updatedData = {...data, photoUrl};
        await api.post('/accounts', updatedData);
      }else {
        setPasswordsNotEquals(true);
      }
    },
    onSuccess: async () => {
      reset();
      setConfirmPassword('')
      setPreview(null);
      toast.success('Usuário criado com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
    setValue("photoUrl", files[0]);
  }

  function redirectToDashboard(){
    navigate('/', { replace: true })
  }

  function redirectToLogin(){
    navigate('/sign-in', { replace: true })
  }

  return(
    <form onSubmit={handleSubmit((data: CreateAccountForm) => mutate(data))} className='w-full h-screen flex justify-center items-center bg-[#F8F8F8]'>
      <Toast />
      <div className='w-[65%] flex flex-col gap-6'>
        <img src={Logo} className='w-fit h-fit' />
        <div className='flex flex-col gap-2'>
          <strong className="text-3xl text-black font-bold">{userLogged ? 'Crie um usuário' : 'Faça seu cadastro'}</strong>
          <span className='text-sm text-gray-600 font-normal'>*Campos obrigatórios</span>
        </div>
        <label htmlFor="media" className="w-fit flex cursor-pointer items-end gap-1.5 text-sm text-green-600 rounded-md" >
            <div className='flex relative'>
            {preview ? (
                <img
                  src={preview}
                  alt=""
                  className="aspect-video w-14 h-14 rounded-full object-cover border-2 border-green-600"
                />
              ) : (
                <div className='w-14 h-14 flex justify-center items-center bg-blue-600 rounded-full border-2 border-green-600'>
                  <span className='text-4xl text-white text-center'>S</span>
                </div>
              )}
              <div className='w-6 h-6 flex justify-centera items-center bg-white rounded-full absolute bottom-[-10px] p-1 right-0'>
                <CameraIcon color='#2D7575' />
              </div>
            </div>
            Carregar foto
        </label>
        <input
          type="file"
          id="media"
          name="coverUrl"
          className="invisible h-0 w-0"
          accept="image/*"
          onChange={onFileSelected}
        />
        <div className='w-full flex flex-col gap-4 mt-12'>
          <div className='w-full grid grid-cols-3 gap-4'>
            <div className="flex flex-col gap-2">
              <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                *Nome completo
                <input type="text" {...register('fullName')} placeholder='Insira seu nome completo' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
              </label>
              {errors.fullName && <span className="text-sm text-red-600 font-normal">{errors.fullName.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                *CPF
                <input type="text" {...register('cpf')} placeholder='Insira seu CPF, somente os números' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
              </label>
              {errors.cpf && <span className="text-sm text-red-600 font-normal">{errors.cpf.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                *E-mail
                <input type="text" {...register('email')} placeholder='Insira seu melhor e-mail' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
              </label>
              {errors.email && <span className="text-sm text-red-600 font-normal">{errors.email.message}</span>}
            </div>
          </div>
          <div className='w-full grid grid-cols-3 gap-4'>
            <div className="flex flex-col gap-2">
              <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                *Nome de usuário
                <input type="text" {...register('name')} placeholder='Insira um nome para o usuário' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
              </label>
              {errors.name && <span className="text-sm text-red-600 font-normal">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                *Senha
                <input type="password" {...register('password')} placeholder='Insira uma senha' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
              </label>
              {errors.password && <span className="text-sm text-red-600 font-normal">{errors.password.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                *Confirmar senha
                <input type="password" placeholder='Insira novamente a senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
              </label>
              {passwordsNotEquals && <span className="text-sm text-red-600 font-normal">As senhas devem ser iguais</span>}
            </div>
          </div>
          <div className='w-full grid grid-cols-3 gap-4'>
            <div className="flex flex-col gap-2">
              <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                *Cargo
                <select {...register('position')} className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600">
                  <option>Selecionar cargo</option>
                  <option value="admin">Administrador</option>
                  <option value="user">Usuário</option>
                </select>
              </label>
              {errors.position && <span className="text-sm text-red-600 font-normal">{errors.position.message}</span>}
            </div>
          </div>
        </div>
        <div className='flex justify-end items-center gap-8'>
          {userLogged ? (
            <button type='button' onClick={redirectToDashboard} className='flex items-center gap-2 text-gray-600 font-sm font-normal'>
              <ArrowUturnLeftIcon className='w-4 h-4' color='#8E9595' />
              Voltar ao Dashboard
            </button>
          ) : (
            <button type='button' onClick={redirectToLogin} className='flex items-center gap-2 text-gray-600 font-sm font-normal'>
              <ArrowUturnLeftIcon className='w-4 h-4' color='#8E9595' />
              Voltar ao Login
            </button>
          )}
          <button type="submit" disabled={isPending} className='w-[200px] p-2 bg-green-600 text-white font-sm font-medium rounded disabled:cursor-not-allowed disabled:opacity-50'>Concluir Cadastro</button>
        </div>
      </div>
    </form>
  )
}