import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import Loading from "@/app/loading"

const PassSend = () => {

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const pass1 = e.target[0].value
    const pass2 = e.target[1].value
    console.log(pass1, pass2)
    if (pass1 !== pass2) {
      confirmAlert({
        message: "As senhas precisam ser iguais. Vamos tentar novamente!",
        buttons: [
          {
            label: 'Ok',
            onClick: () => {
              e.target[0].value = ""
              e.target[1].value = ""
            }
          }
        ]
      }) 
    } else {
      setIsLoading(true)
      //
      try {
        const res = await fetch("/api/auth/new-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            pass1,
          }),
        })

        if (res.status === 201) {
          confirmAlert({
            message: "Prezado Usuário, a senha foi alterada com sucesso! Por favor, faça o login com a nova senha!",
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
            message: "Ocorreu um erro. Por favor, tente solicitar a recuperação de acesso novamente.",
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
        console.log(err, "Ocorreu um erro no lado do servidor!")
      }
    }
  }

  return (
    <>
      {!isLoading ?
          <>
            <h2 className="text-white p-4 font-bold text-[18px] block">Prezado Usuário!</h2>
            <div className="my-3 animate__animated animate__fadeIn">
              <h3 className="text-[#9f50ac] text-[17px] font-bold">Crie uma nova senha para recuperar o acesso ao seu perfil:</h3>
              <form 
                className="form" 
                onSubmit={handleSubmit}
              >
                <div className="my-9">
                  <input
                    className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
                    type="password" 
                    name="password"
                    minLength={5}
                    autoComplete="on" 
                    placeholder="senha nova" 
                    required 
                  />
                </div>
                <div className="my-9">
                  <input
                    className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
                    type="password" 
                    name="password"
                    minLength={5}
                    autoComplete="on" 
                    placeholder="senha nova" 
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

export default PassSend
