import { ImExit, ImEnter } from 'react-icons/im'

const ButtonAuth = ({setShowModal, name, signOut, nameShow, setIsLoading}) => {

  const handleClick = () => {
    if(!name) {
      // setIsLoading(true)
      setShowModal(true)

    } else {
      setIsLoading(true)
      signOut()
    }
  }

  return (
    <div>
      <p className="text-[#9f50ac] absolute left-10 top-10">
        {"Olá, " + nameShow + "!"}
      </p>
      <button
        className="text-white absolute right-10 top-10 scale-125" 
        title="Entrar ou Cadastrar-se"
        onClick={handleClick}
      >
        {name ? <ImExit/> : <ImEnter/>}
      </button>
    </div>
  )
}

export default ButtonAuth
