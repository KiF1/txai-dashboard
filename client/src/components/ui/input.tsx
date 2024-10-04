interface InputProps{
  isMandatory?: boolean
  label: string,
  placeholder: string
}

export function Input({ isMandatory, label, placeholder }: InputProps){
  return(
    <label className="w-full flex flex-col gap-2 text-sm text-black font-normal">
      {isMandatory ? `*${label}` : label}
      <input type="text" placeholder={placeholder} className="w-full px-4 py-2 text-black border border-gray-1000 rounded-md placeholder:text-gray-600" />
    </label>
  )
}