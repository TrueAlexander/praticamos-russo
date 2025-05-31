import { IoMdDoneAll } from "react-icons/io"
import { MouseEventHandler } from "react"

interface ButtonProps {
  name?: string
  text: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  addStyle?: string
  learnt?: boolean
}

const Button = ({name, text, disabled, onClick, addStyle, learnt}: ButtonProps): JSX.Element => {
  
  const marked = learnt || false
  return (
    <>
      <button
        className={`bg-[#9f50ac] z-10 select-none  tracking-wider relative font-bold h-[32px] min-w-[100px] px-2 rounded-[10px] text-white mr-2 ml-2 ${disabled ? "cursor-default bg-[#a050ac69] text-slate-400" : "active:scale-95"} ${addStyle ? addStyle : ""}`}
        onClick={onClick}
        disabled={disabled}
        name={name}
      >
        {text}
        <span>{marked && <IoMdDoneAll className="text-white absolute top-0.5 right-2" />}</span>
      </button>   
    </>

)}

export default Button