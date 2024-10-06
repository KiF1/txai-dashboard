import Logo from '../../../assets/logo.svg'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '../../../services/axios'
import toast from 'react-hot-toast'
import { Toast } from '../../../components/Toast'
import { fetchUserData, User } from '../../../hooks/fetchUserData'
import ReactLoading from 'react-loading'
import { queryClient } from '../../../services/react-query'
import { ArrowUturnLeftIcon } from '@heroicons/react/16/solid'

const editUserFormSchema = z.object({
  name: z.string().min(1, { "message": "Informe o apelido usuário" }),
  fullName: z.string().min(1, { "message": "Informe o nome do usuário" }),
  email: z.string().email({ "message": "Informe um e-mail válido" }),
  cpf: z.string().min(11, { "message": "Informe o cpf do usuário" }),
  password: z.string().min(6, { "message": "Informe uma senha com no mínimo 6 caracteres" }),
  position: z.string().min(1, { "message": "Informe o cargo do Usuário"}),
  photoUrl: z.string()
});

type EditUserForm = z.infer<typeof editUserFormSchema>;

export function EditUser(){
  const navigate = useNavigate()
  const { id: idRouteParam } = useParams();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [preview, setPreview] = useState<string | null>(null)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<EditUserForm>({
    resolver: zodResolver(editUserFormSchema),
  });
  const { data: userLogged, isPending: isPendingFetchUserLogged } = fetchUserData();

  const { data: userFetched, isPending: isPendingFetchUserFetched } = useQuery<User>({
    queryKey: ["userFetched"],
    queryFn: async () => {
      const response = await api.get(`/accounts/${idRouteParam}`);
      const user = response.data;

      setValue("name", user.name)
      setValue("fullName", user.fullName)
      setValue("email", user.email)
      setValue("password", user.password)
      setValue("cpf", user.cpf)
      setValue("position", user.position)
      setValue("photoUrl", user.photoUrl)

      setPreview(user.photoUrl)
      setConfirmPassword(user.password)

      return user;
    }
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: EditUserForm) => {
      const formatedData = {
        name: data.name,
        fullName: data.fullName,
        email: data.email,
        position: data.position,
      }
      await api.put(`/accounts/${idRouteParam}`, formatedData);
    },
    onSuccess: async () => {
      toast.success('Usuário editado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['userFetched'] });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  })

  function redirectToDashboard(){
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if(userFetched && userLogged){
      if(userFetched?.id !== userLogged.id && userLogged?.position  !== 'admin'){
        navigate('/', { replace: true }) 
      }
    }
  }, [userFetched, userLogged])

  return(
    <>
      {!isPendingFetchUserFetched && preview && !isPendingFetchUserLogged ? (
        <form onSubmit={handleSubmit((data: EditUserForm) => mutate(data))} className='w-full h-screen flex justify-center items-center bg-[#F8F8F8]'>
          <Toast />
          <div className='w-[65%] flex flex-col gap-6'>
            <img src={Logo} className='w-fit h-fit' />
            <div className='flex flex-col gap-2'>
              <strong className="text-3xl text-black font-bold">Edite o usuário</strong>
              <span className='text-sm text-gray-600 font-normal'>*Campos obrigatórios</span>
            </div>
            <img src={preview} alt="" className="aspect-video w-14 h-14 rounded-full object-cover border-2 border-green-600" />
            <div className='w-full flex flex-col gap-4 mt-12'>
              <div className='w-full grid grid-cols-3 gap-4'>
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    *Nome completo
                    <input disabled={isPendingFetchUserFetched} type="text" {...register('fullName')} placeholder='Insira seu nome completo' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600 disabled:opacity-50" />
                  </label>
                  {errors.fullName && <span className="text-sm text-red-600 font-normal">{errors.fullName.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    *CPF
                    <input disabled type="text" {...register('cpf')} placeholder='Insira seu CPF, somente os números' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600 disabled:opacity-50" />
                  </label>
                  {errors.cpf && <span className="text-sm text-red-600 font-normal">{errors.cpf.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    *E-mail
                    <input disabled={isPendingFetchUserFetched} type="text" {...register('email')} placeholder='Insira seu melhor e-mail' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600 disabled:opacity-50" />
                  </label>
                  {errors.email && <span className="text-sm text-red-600 font-normal">{errors.email.message}</span>}
                </div>
              </div>
              <div className='w-full grid grid-cols-3 gap-4'>
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    *Nome de usuário
                    <input disabled={isPendingFetchUserFetched} type="text" {...register('name')} placeholder='Insira um nome para o usuário' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600 disabled:opacity-50" />
                  </label>
                  {errors.name && <span className="text-sm text-red-600 font-normal">{errors.name.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    *Senha
                    <input disabled type="password" {...register('password')} placeholder='Insira uma senha' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600 disabled:opacity-50" />
                  </label>
                  {errors.password && <span className="text-sm text-red-600 font-normal">{errors.password.message}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    *Confirmar senha
                    <input disabled type="password" placeholder='Insira novamente a senha' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600 disabled:opacity-50" />
                  </label>
                </div>
              </div>
              <div className='w-full grid grid-cols-3 gap-4'>
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    *Cargo
                    <select {...register('position')} className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600 disabled:opacity-50">
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
              <button type='button' onClick={redirectToDashboard} className='flex items-center gap-2 text-gray-600 font-sm font-normal'>
                <ArrowUturnLeftIcon className='w-4 h-4' color='#8E9595' />
                Voltar ao Dashboard
              </button>
              <button type="submit" disabled={isPending} className='w-[200px] p-2 bg-green-600 text-white font-sm font-medium rounded disabled:cursor-not-allowed disabled:opacity-50'>Concluir Edição</button>
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <ReactLoading
            className="w-fit"
            type="spinningBubbles"
            color="#2D7575"
            height="80px"
            width="100px"
          />
        </div>
      )}
    </>
  )
}