import Ellipse from '../../assets/ellipse.svg'
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Toast } from "../../components/Toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const loginFormSchema = z.object({
  cpf: z.string().min(10, { "message": "Informe um CPF" }),
  password: z.string().min(6, { "message": "Informe uma senha com no mínimo 6 caracteres" }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export function SignIn() {
  const [saveUser, setSaveUser] = useState(false);
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await api.post('/sessions', data);
      return response.data.access_token;
    },
    onSuccess: async (accessToken) => {
      if(saveUser){
        await localStorage.setItem('access_token', accessToken);
      }else{
        await sessionStorage.setItem('access_token', accessToken);
      }
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      await navigate('/', { replace: true })
    },
    onError: () => {
      toast.error('Erro ao realizar Login, email ou senha Iválidos');
    }
  })

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSaveUser(event.target.checked);
  };


  return(
    <div className="w-[65%] flex flex-col gap-6">
      <h1 className="text-3xl text-black font-bold">Login</h1>
      <form className="w-[75%] flex flex-col gap-6" onSubmit={handleSubmit((data: LoginForm) => mutate(data))}>
         <div className="flex flex-col gap-2">
            <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
              CPF
              <input {...register("cpf")} type="text" placeholder="Insira seu CPF, somente os números" className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
            </label>
            {errors.cpf && <span className="text-sm text-red-600 font-normal">{errors.cpf.message}</span>}
         </div>
         <div className="flex flex-col gap-2">
            <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
              Senha
              <input {...register("password")} type="text" placeholder="Insira sua senha" className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
            </label>
            {errors.password && <span className="text-sm text-red-600 font-normal">{errors.password.message}</span>}
         </div>
        <div className="w-full flex justify-between items-center">
            <label className="flex gap-2 text-sm text-black font-normal">
              <input type="checkbox" checked={saveUser} onChange={handleCheckboxChange} />
              Lembrar minha Senha
            </label>
          <span className="text-sm text-green-600 font-normal">Esqueci Minha Senha</span>
        </div>
        <button type="submit" disabled={isPending} className='w-[100%] p-2 bg-green-600 text-white font-sm font-medium rounded disabled:cursor-not-allowed disabled:opacity-50'>Entrar</button>
        <strong className="text-sm text-black font-normal text-center">Não tem uma conta? <span className="text-sm text-green-600 font-normal"> cadastre-se agora</span></strong>
        <div className="flex justify-center align-center gap-2 pt-12">
          <strong className="text-sm text-gray-600 font-normal">Ajuda</strong>
          <img className="w-fit h-fit my-auto" src={Ellipse} />
          <strong className="text-sm text-gray-600 font-normal">Política de privacidade</strong>
        </div>
      </form>
      <Toast />
    </div>
  )
}