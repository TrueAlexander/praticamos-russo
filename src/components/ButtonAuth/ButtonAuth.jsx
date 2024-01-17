import { ImExit, ImEnter } from 'react-icons/im'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const ButtonAuth = ({setShowModal, name, signOut, nameShow, setIsLoading}) => {

  const handleClick = () => {
    if(!name) {
      setShowModal(true)
    } else {     
      confirmAlert({
        message: `${nameShow}, tem certeza de que deseja sair?`,
        buttons: [
          {
            label: 'Sim',
            onClick: () => {
              signOut() 
              setIsLoading(true)      
            }
          },
          {
            label: 'Não',
            // onClick: () => console.log('Click No')
          }
        ]
      })
    }
  }

  return (
    <div>
      <p 
        // className="text-[#9f50ac] absolute left-5 top-5 animate__animated animate__fadeIn animate-slower"
        className="text-[#9f50ac] animate__animated animate__fadeIn animate-slower"
      >
        Olá, {nameShow.length > 12 ? nameShow.slice(0, 9) + "..." : nameShow}!
      </p>
      <button
        // className="text-white absolute right-5 top-5 scale-125"
        className="text-white scale-125" 
        title={nameShow === "Visitante" ? "Entrar ou Cadastrar-se" : "Sair"}
        onClick={handleClick}
      >
        {name ? <ImExit/> : <ImEnter/>}
      </button>
    </div>
  )
}

export default ButtonAuth
