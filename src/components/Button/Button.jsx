
const Button = ({name, text, disabled, onClick}) => {
  return (
  <button
    className="bg-[#9f50ac] select-none font-bold h-[32px] min-w-[100px] rounded-[10px] text-white mr-2 ml-2"
    onClick={onClick}
    disabled={disabled}
    name={name}
  >
    {text}
  </button>
)}

export default Button