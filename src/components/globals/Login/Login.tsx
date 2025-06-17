"use client"
import { useState, useEffect, FormEvent, Dispatch, SetStateAction } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import Button from '../Button/Button'

interface LoginProps {
  setShowModal: Dispatch<SetStateAction<boolean>>
  setModeLogin: Dispatch<SetStateAction<boolean>>
}

const Login: React.FC<LoginProps> = ({setShowModal, setModeLogin}) => {
  const session = useSession()
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const form = e.currentTarget
    // Acessar os inputs pelo name
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    await signIn("credentials", {
        email,
        password,
      })       
  }

   const handleCreateUserClick = () => {
    // Remove the error param from URL by replacing URL without query string or with error removed
    const url = new URL(window.location.href)
    url.searchParams.delete("error")
    router.replace(url.toString())

    setModeLogin(false) 
  }

  useEffect(() => {
    setError(params.get("error"))
    if (session.status === 'authenticated') {
      router.push('/')
      setShowModal(false)    
    }
    
  }, [params, router, session.status, setShowModal])

  
  return (
    <div className="my-3 animate__animated animate__fadeIn">
      <h3 className="text-[#9f50ac] text-[17px] font-bold">Faça Login:</h3>
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
            placeholder="e-mail" 
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
        <Button
          type="submit"
          text="Enviar"
        />
      </form>
      {/* <p className='text-red-600 my-3 font-semibold'>{error && decodeURIComponent(error?.slice(6))}</p> */}
      <p className='text-red-600 my-3 font-semibold'>{error && decodeURIComponent(error)}</p>
   
      <p
        onClick={() => router.push('/recover-access')}
        className="text-white text-[13px] underline cursor-pointer"
        title="Recuperar a senha"
      >
        esqueceu a senha?
      </p>   
  
      <h3 className="text-[#9f50ac] py-4 text-[17px] font-bold">ou crie um perfil:</h3>
        <button 
          title="Criar Usuário" 
          className="text-white text-[13px] underline cursor-pointer"
          onClick={handleCreateUserClick}
        >
          criar usuário
        </button>
    </div>
  )
}

export default Login
