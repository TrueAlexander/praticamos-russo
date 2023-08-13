import { useRouter } from "next/navigation"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const AskRecover = ({setModeAsk}) => {

  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target[0].value
    
    try {
      const res = await fetch("/api/auth/recover-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
      if (res.status === 201) {
        
        e.target[0].value = ""
        confirmAlert({
          message: `Para recuperar o acesso por favor confira seu email: ${email}`,
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
              onClick: () => router.push("/recover-access")
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
    <>
      <h2 className="text-white p-4 font-bold text-[18px] block">Prezado Usuário!</h2>
      <div className="my-3 animate__animated animate__fadeIn">
        <h3 className="text-[#9f50ac] text-[17px] font-bold">Para recuperar o acesso para a plataforma nos informa seu email:</h3>
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
    </>
  )
}

export default AskRecover
