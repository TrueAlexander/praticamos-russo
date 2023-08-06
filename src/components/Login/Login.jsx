"use client"
import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'

const Login = ({setShowModal, setModeLogin, setIsLoading}) => {
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value
    await signIn("credentials", {
      email,
      password,
    })  
  }

  useEffect(() => {
    setError(params.get("error"))
    if (session.status === 'authenticated') {
      router.push('/')
      setShowModal(false)
    }
    
  }, [params])
  
  return (
    <div className="my-7 animate__animated animate__fadeIn">
      <h3 className="text-[#9f50ac] pb-4 text-[15px] font-bold">Faz Login:</h3>
      <form 
        className="form" 
        onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md max-w-[600px] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="email" 
            name="email" 
            autoComplete="on"
            placeholder="email" 
            required 
          />
        </div>
        <div className="mt-7 mb-9">
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
          title='Entrar'
        >
          Enviar
        </button>
      </form>
      <p className='text-white mt-3 font-bold'>{error?.slice(6)}</p>
      <h3 className="text-[#9f50ac] pt-3 pb-2 text-[15px] font-bold">ou crie um perfil:</h3>
        <button 
          title="Criar Usuário" 
          className="text-white text-[15px] underline cursor-pointer"
          onClick={() => setModeLogin(false)}
        >
          criar usuário
        </button>
    </div>
  )
}

export default Login
