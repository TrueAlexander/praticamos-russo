import { ImExit, ImEnter } from 'react-icons/im'

const ButtonAuth = ({setShowModal, name, signOut, nameShow, setIsLoading}) => {

  const handleClick = () => {
    if(!name) {
      // setIsLoading(true)
      setShowModal(true)

    } else {
      const areYouSure = confirm(`${nameShow}, está seguro que quer sair?`)
      if (areYouSure) {
        setIsLoading(true)
        signOut()
      }
    }
  }

  return (
    <div>
      <p className="text-[#9f50ac] absolute left-5 top-5 animate__animated animate__fadeIn animate-slower">
        {"Olá, " + nameShow + "!"}
      </p>
      <button
        className="text-white absolute right-5 top-5 scale-125" 
        title={nameShow === "Desconhecido" ? "Entrar ou Cadastrar-se" : "Sair"}
        onClick={handleClick}
      >
        {name ? <ImExit/> : <ImEnter/>}
      </button>
    </div>
  )
}

export default ButtonAuth
