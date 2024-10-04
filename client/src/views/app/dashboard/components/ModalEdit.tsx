import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

interface ShowModalEditProps{
  showModal: () => void;
}

export function ModalEdit({ showModal }: ShowModalEditProps){
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-gray-800 px-12 pt-12 pb-6 flex flex-col gap-4">
              <div className="w-full flex justify-between items-center border-b-2 pb-2 border-b-gray-300">
                <strong className="text-xl font-semibold text-black">Gerenciar produto</strong>
                <button type="button" onClick={showModal} className="bg-transparent border-0">
                  <XMarkIcon className="w-6 h-6" color="#B9C6C6" />
                </button>
              </div>
              <label className="w-[50%] flex flex-col gap-2 text-sm font-normal text-black">
                Data de Lançamento
                <input type="date" className="bg-transparent border-b-2 border-b-black" />
              </label>
              <div className="grid grid-cols-[1fr,0.2fr] gap-4">
                <Input label="Nome do Produto" placeholder="Escreva o nome do produto" />
                <div className="w-full flex flex-col gap-2">
                  <strong className="text-sm font-normal text-black">Quantidade</strong>
                  <div className="flex items-center justify-between gap-2 h-[37px] border-2 border-green-600 rounded-[3px] p-2">
                    <button type="button" className="bg-transparent border-0">
                      <MinusIcon className="w-4 h-4" color="#2D7575" />
                    </button>
                    <span className="text-sm font-normal text-black">1</span>
                    <button type="button" className="bg-transparent border-0">
                      <PlusIcon className="w-4 h-4" color="#2D7575" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[50%]">
                <Input label="Valor R$" placeholder="Insira um Valor" />
              </div>
            </div>
            <div className="bg-gray-800 px-12 pb-12 flex justify-end items-center">
              <button type="button" onClick={showModal} className="bg-transparent border-0 text-sm font-medium text-black p-2 w-[100px] hover:bg-gray-600  hover:mr-2 hover:rounded">Cancelar</button>
              <Button size="100px" text="Cadastrar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}