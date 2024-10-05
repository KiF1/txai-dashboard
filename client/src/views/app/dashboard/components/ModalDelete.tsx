import { TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../services/axios";
import { queryClient } from "../../../../services/react-query";
import { useState } from "react";

interface ShowModalDeleteProps{
  idProduct: string;
  showModal: () => void;
}

export function ModalDelete({ idProduct, showModal }: ShowModalDeleteProps){
  const [errorMessage, setErrorMessage] = useState(false);
  
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await api.delete(`/products/${idProduct}`);
    },
    onSuccess: async () => {
      showModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      setErrorMessage(true);
    }
  })

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-800 px-4 pt-4 pb-12 flex flex-col gap-4">
              <div className="w-full grid grid-cols-[1fr,0.1fr]">
                <div className="w-14 h-14 flex justify-center items-center bg-red-600 rounded-full p-2 mx-auto">
                  <TrashIcon color="#FFFFFF" className="w-8 h-8" />
                </div>
                <button type="button" onClick={showModal} className="w-fit h-fit bg-transparent border-0 ml-auto">
                  <XMarkIcon className="w-6 h-6" color="#B9C6C6" />
                </button>
              </div>
              {errorMessage && <span className="text-sm font-normal text-red-600">Erro ao deletar Produto, tente novamente mais tarde!</span>}
            </div>
            <div className="bg-gray-800 p-6 px-14 grid grid-cols-2">
              <button type="button" onClick={showModal} disabled={isPending} className="w-full bg-transparent border-0 text-sm font-medium text-black p-2 hover:bg-gray-600  hover:mr-2 hover:rounded disabled:cursor-not-allowed disabled:opacity-50">Cancelar</button>
              <button type="button" onClick={() => mutate()} disabled={isPending} className="bg-red-600 text-sm font-medium text-white p-2 w-full rounded-[3px] disabled:cursor-not-allowed disabled:opacity-50">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}