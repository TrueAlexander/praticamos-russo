import { ImExit, ImEnter } from 'react-icons/im'

const ButtonAuth = ({setShowModal}) => {
  return (
    <div>
      <button
        className="text-white absolute right-10 top-10 scale-125" 
        title="Entrar ou Cadastrar-se"
        onClick={() => setShowModal(true)}
      >
        <ImEnter/>
      </button>
    </div>
  )
}

export default ButtonAuth
