interface ButtonProps {
  text: string;
  size: string;
  isPending: boolean; 
}

export function Button({ text, size }: ButtonProps){
  return (
    <button type="button" className={`w-[${size}] p-2 bg-green-600 text-white font-sm font-medium rounded disabled:cursor-not-allowed disabled:opacity-50`}>{text}</button>
  )
}