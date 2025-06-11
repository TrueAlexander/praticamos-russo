import { IoMdDoneAll } from "react-icons/io"
import { MouseEventHandler } from "react"
import Link from "next/link"

interface ButtonProps {
  name?: string
  text: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  addStyle?: string
  learnt?: boolean
  href?: string //if present, renders as <Link>
}

const Button = ({name, text, disabled, onClick, addStyle, learnt, href}: ButtonProps): JSX.Element => {
  
  const marked = learnt || false

  const baseClasses = `bg-[#9f50ac] z-10 select-none tracking-wider relative font-bold h-[32px] min-w-[100px] px-2 rounded-[10px] text-white mr-2 ml-2 ${
    disabled ? "cursor-default bg-[#a050ac69] text-slate-400" : "active:scale-95"
  } ${addStyle ?? ""}`

    const content = (
    <>
      {text}
      {marked && <IoMdDoneAll className="text-white absolute top-0.5 right-2" />}
    </>
  )

    // Render <Link> if href is passed
  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    )
  }

  // Otherwise render regular button
  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      name={name}
    >
      {content}
    </button>
  )
}  

export default Button