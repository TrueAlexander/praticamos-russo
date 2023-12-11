
const Button = ({name, text, disabled, onClick, addStyle}) => {

  return (
  <button
    className={`bg-[#9f50ac] select-none font-bold h-[32px] min-w-[100px] px-2 rounded-[10px] text-white mr-2 ml-2 active:scale-95 ${addStyle ? addStyle : ""}`}
    onClick={onClick}
    disabled={disabled}
    name={name}
  >
    {text}
  </button>
)}

export default Button