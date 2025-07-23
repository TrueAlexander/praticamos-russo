import { useRouter } from "next/navigation"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useState } from "react"
import Loading from "@/app/loading"

const AskRecover = () => {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
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
          message: `Para recuperar o acesso, por favor, abra seu e-mail: ${email}`,
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                setIsLoading(false)
                router.push("/")     
              }
            }
          ]
        })

      } else {
        confirmAlert({
          message: "Não foi possível encontrar um usuário com este e-mail. Por favor, tente novamente ou crie um perfil na plataforma.",
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                setIsLoading(false)
                router.push("/recover-access")
              }
            }
          ]
        })  
      }  
    } catch (err) {   
      console.log(err, "Erro do lado de servidor!")
      confirmAlert({
          message: "Lamentavelmente, não houve resposta do servidor. Por favor, tente novamente mais tarde.",
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                setIsLoading(false)
                router.push("/")
              }
            }
          ]
        }) 
    }
  }

  return (
    <>{!isLoading ? 
      <>
         <h2 className="text-white p-4 font-bold text-[18px] block">Prezado Usuário!</h2>
        <div className="my-3 animate__animated animate__fadeIn">
          <h3 className="text-[#9f50ac] text-[17px] font-bold">Para recuperar o acesso à plataforma, por favor, informe seu e-mail:</h3>
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
                placeholder="e-mail" 
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
      </> : 
      <>
        <Loading/>
      </>
    }
    </>
  )
}

export default AskRecover
