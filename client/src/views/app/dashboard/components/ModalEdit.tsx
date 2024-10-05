import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../../services/axios";
import { queryClient } from "../../../../services/react-query";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  createdAt: string;
  creatorId: string;
}

interface ShowModalEditProps{
  idProduct: string;
  showModal: () => void;
}

const editProductFormSchema = z.object({
  name: z.string().min(1, { "message": "Informe a nome do produto" }),
  createdAt: z.string().min(1, { "message": "Informe a data de Criação" }),
  price: z.number().min(1, { "message": "Informe preço do produto" }),
  quantity: z.number().min(1, { "message": "Informe a quantidade de produtos" }),
});

type EditProductForm = z.infer<typeof editProductFormSchema>;

export function ModalEdit({ idProduct, showModal }: ShowModalEditProps){
  const [errorMessage, setErrorMessage] = useState(false);
  const [quantityProduct, setQuantityProduct] = useState<number>(1);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<EditProductForm>({
    resolver: zodResolver(editProductFormSchema),
  });

  const { isPending: isPendingFetchProduct } = useQuery<Product>({
    queryKey: [`${idProduct}`],
    queryFn: async () => {
      const response = await api.get(`/products/${idProduct}`);
      const createdAt = new Date(response.data.createdAt).toISOString().split('T')[0];

      setValue('createdAt', createdAt)
      setValue('name', response.data.name)
      setValue('price', response.data.price)
      setValue('quantity', response.data.quantity)
      setQuantityProduct(response.data.quantity)

      return response.data;
    },
  });
  
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: EditProductForm) => {
      const createdAt = new Date(data.createdAt).toISOString();
    
      const updatedData = {...data, createdAt};
      await api.put(`/products/${idProduct}`, updatedData);
    },
    onSuccess: async () => {
      reset();
      showModal();
      queryClient.invalidateQueries({ queryKey: [`${idProduct}`] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      setErrorMessage(true);
    }
  })

  useEffect(() => {
    setValue('quantity', quantityProduct, { shouldValidate: true, shouldDirty: true });
  }, [quantityProduct, setValue]);


  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <form onSubmit={handleSubmit((data: EditProductForm) => mutate(data))} className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-800 px-12 pt-12 pb-6 flex flex-col gap-4">
              <div className="w-full flex justify-between items-center border-b-2 pb-2 border-b-gray-300">
                <strong className="text-xl font-semibold text-black">Gerenciar produto</strong>
                <button type="button" onClick={showModal} className="bg-transparent border-0">
                  <XMarkIcon className="w-6 h-6" color="#B9C6C6" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <label className="w-[50%] flex flex-col gap-2 text-sm font-normal text-black">
                  Data de Lançamento
                  <input disabled={isPendingFetchProduct} type="date" {...register('createdAt')} className="bg-transparent border-b-2 border-b-black disabled:opacity-50" />
                </label>
                {errors.createdAt && <span className="text-sm text-red-600 font-normal">{errors.createdAt.message}</span>}
              </div>
              <div className="grid grid-cols-[1fr,0.2fr] gap-4">
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    Nome do Produto
                    <input type="text" disabled={isPendingFetchProduct} {...register('name')} placeholder='Escreva o nome do produto' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600 disabled:opacity-50" />
                  </label>
                  {errors.name && <span className="text-sm text-red-600 font-normal">{errors.name.message}</span>}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <strong className="text-sm font-normal text-black">Quantidade</strong>
                  <div className="flex items-center justify-between gap-2 h-[37px] border-2 border-green-600 rounded-[3px] p-2">
                    <button type="button" disabled={quantityProduct === 0 || isPendingFetchProduct} onClick={() => setQuantityProduct(quantityProduct => quantityProduct -= 1)} className="bg-transparent border-0">
                      <MinusIcon className="w-4 h-4" color="#2D7575" />
                    </button>
                    <span className="text-sm font-normal text-black">{quantityProduct}</span>
                    <button disabled={isPendingFetchProduct} onClick={() => setQuantityProduct(quantityProduct => quantityProduct += 1)} type="button" className="bg-transparent border-0">
                      <PlusIcon className="w-4 h-4" color="#2D7575" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[50%]">
                <div className="flex flex-col gap-2">
                  <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
                    Valor R$
                    <input disabled={isPendingFetchProduct} type="number" {...register('price', { valueAsNumber: true })} placeholder='Insira um Valor' className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
                  </label>
                  {errors.quantity && <span className="text-sm text-red-600 font-normal">{errors.quantity.message}</span>}
                </div>
              </div>
              {errorMessage && <span className="text-sm font-normal text-red-600">Erro ao editar Produto, tente novamente mais tarde!</span>}
            </div>
            <div className="bg-gray-800 px-12 pb-12 flex justify-end items-center">
              <button type="button" onClick={showModal} className="bg-transparent border-0 text-sm font-medium text-black p-2 w-[100px] hover:bg-gray-600  hover:mr-2 hover:rounded">Cancelar</button>
              <button type="submit" disabled={isPending || isPendingFetchProduct} className='w-[100px] p-2 bg-green-600 text-white font-sm font-medium rounded disabled:cursor-not-allowed disabled:opacity-50'>Atualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}