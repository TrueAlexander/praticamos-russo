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
  href?: string // if present, renders as <Link>
  type?: "button" | "submit" | "reset"
}

const Button = ({
  name,
  text,
  disabled,
  onClick,
  addStyle,
  learnt,
  href,
  type
}: ButtonProps): JSX.Element => {
  const marked = learnt || false

  const baseClasses = `
    relative z-10 select-none tracking-wider font-bold
    h-[32px] leading-[32px] min-w-[100px] px-2 rounded-[10px]
    text-white mr-2 ml-2 transition-all duration-200 ease-in-out
    ${disabled
      ? "cursor-default bg-[#a050ac69] text-slate-400"
      : "cursor-pointer active:scale-95"}
    ${!disabled && `
      bg-[#9f50ac]/60
      backdrop-blur-md
      shadow-[inset_2px_2px_6px_rgba(255,255,255,0.2),_4px_4px_12px_rgba(0,0,0,0.3)]
      hover:brightness-110
    `}
    ${addStyle ?? ""}
  `

  const content = (
    <>
      {text}
      {marked && (
        <IoMdDoneAll className="text-white absolute top-0.5 right-2 pointer-events-none" />
      )}
    </>
  )

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
      name={name}
      type={type}
    >
      {content}
    </button>
  )
}

export default Button
