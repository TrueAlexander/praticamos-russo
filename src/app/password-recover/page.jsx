'use client'
import { IoClose } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const PasswordRecover = ({}) => {

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target[0].value
    
    try {
      const res = await fetch("/api/auth/remind", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
      if (res.status === 201) {
        confirmAlert({
          message: "A senha foi enviada ao seu email!",
          buttons: [
            {
              label: 'Ok',
              onClick: () => router.push("/")
            }
          ]
        })
      } else {
        confirmAlert({
          message: "O usuário com este email não foi encontrado! Tente novamente ou crie um perfil na plataforma!",
          buttons: [
            {
              label: 'Ok',
              onClick: () => router.push("/")
            }
          ]
        })  
      }  
    } catch (err) {   
      console.log(err, "Erro do lado de servidor!")
      confirmAlert({
          message: "Infelizmente não há resposta de servidor! Por favor tente novamente mais tarde!",
          buttons: [
            {
              label: 'Ok',
              onClick: () => router.push("/")
            }
          ]
        }) 
    }

  }

  return (
    <div 
      className="opacity-1 pointer-events-auto w-full h-full fixed top-0 left-0 bg-[#2b2737] show animate__animated animate__fadeIn animate__slower"
    >
      <div 
        className="absolute left-10 right-10 top-10 bottom-10 rounded-lg my-0 mx-auto max-w-[400px]  ease-in duration-1000 text-center flex flex-col justify-center items-center overflow-hidden"
      >
        <h2 className="text-white p-4 font-bold text-[18px] block">Prezado Usuário!</h2>
        <button
          onClick={() => router.push("/")}
          title="Voltar"
          className="text-white text-[22px] absolute right-3 top-3 scale-125"
        >  
          <IoClose/></button>
        <div className="my-3 animate__animated animate__fadeIn">
          <h3 className="text-[#9f50ac] text-[17px] font-bold">Para recuperar a sua senha nos informa seu email:</h3>
          <form 
            className="form" 
            onSubmit={handleSubmit}
          >
            <div className="my-9">
              <input
                className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
                type="email" 
                name="email" 
                autoComplete="on"
                placeholder="email" 
                required 
              />
            </div>
            <button 
              className="bg-[#9f50ac] select-none font-bold h-[30px] min-w-[100px] rounded-[10px] text-white mr-2 ml-2" 
              type="submit"
              title='Enviar'
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PasswordRecover
