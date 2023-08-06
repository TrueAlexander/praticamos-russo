"use client"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const Register = ({setShowModal, setModeLogin, setIsLoading}) => {

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    setIsLoading(true)
    ///
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
      if (res.status === 201) {
        confirmAlert({
          message: `Prezado ${name}, seu usuário foi criado! Faz por favor login!`,
          buttons: [
            {
              label: 'Ok',
              // onClick: () => {}
            }
          ]
        })
      } else {
        confirmAlert({
          message: "Deu errado! Será que o usuário ja existe? Faz login ou tente outra vez!",
          buttons: [
            {
              label: 'Ok',
              // onClick: () => {}
            }
          ]
        })  
      }
      setIsLoading(false)
      setModeLogin(true)
    } catch (err) {   
      console.log(err, "Erro do lado de servidor!")
    }
  }

  return (
    <div className="my-7 animate__animated animate__fadeIn">
      <h3 className="text-[#9f50ac] pb-4 text-[15px] font-bold">Crie um novo Usuário:</h3>
      <form 
        className="form" 
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="name" 
            autoComplete="on"
            placeholder="nome" 
            required 
          />
        </div>
        <div className="my-7">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="email" 
            name="email" 
            autoComplete="on"
            placeholder="email" 
            required 
          />
        </div>
        <div className="mb-9">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="password" 
            name="password"
            minLength={5}
            autoComplete="on" 
            placeholder="senha" 
            required 
          />
        </div>
        <button 
          className="bg-[#9f50ac] select-none font-bold h-[30px] min-w-[100px] rounded-[10px] text-white mr-2 ml-2" 
          type="submit"
          title='Fazer cadastro'
        >
          Enviar
        </button>
      </form>
      <h3 className="text-[#9f50ac] pt-6 pb-2 text-[15px] font-bold">ou identifique-se:</h3>
        <button 
          title="Criar Usuário" 
          className="text-white text-[15px] underline cursor-pointer"
          onClick={() => setModeLogin(true)}
        >
          fazer login
        </button>
    </div>
  )
}

export default Register
