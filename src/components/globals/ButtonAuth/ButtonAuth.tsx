"use client"
import { ImExit, ImEnter } from 'react-icons/im'
import { confirmAlert } from 'react-confirm-alert'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import '@/utils/react-confirm-alert.css'
import { useSession, signOut } from 'next-auth/react'
import AdminLink from '@/components/globals/AdminLink/AdminLink' 
import AuthModal from '@/components/globals/AuthModal/AuthModal'
import Loading from '@/app/loading'

type ButtonAuthProps = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ButtonAuth = ({showModal, setShowModal}: ButtonAuthProps) => {

  // const router = useRouter()
  const session = useSession()
  const params = useSearchParams()

  
  const [nameShow, setNameShow] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
 
  const name = session.data?.user?.name || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')
    if (session.status !== 'loading') {
      setIsLoading(false)
    }
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Vistante")
    }
  }, [session.status, session.data?.user?.name])

  useEffect(() => {
  if (params.get("error")) {
    setShowModal(true)
  }
  }, [params])



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

  if(isLoading) {
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2737]">
        <Loading/> 
      </div>
    )
  }

  return (
    <div>
      {nameShow.length > 1 && (
      <p className="text-[#9f50ac] animate__animated animate__fadeIn animate-slower absolute left-5 top-5">
        Olá, {nameShow.length > 12 ? nameShow.slice(0, 9) + "..." : nameShow}!
      </p>
      )}

      <button
        className="text-white scale-125 absolute right-5 top-6" 
        title={nameShow === "Visitante" ? "Entrar ou Cadastrar-se" : "Sair"}
        onClick={handleClick}
      >
        {name ? <ImExit/> : <ImEnter/>}
      </button>
      {showModal && <AuthModal showModal={showModal} setShowModal={setShowModal} setIsLoading={setIsLoading}/>}
      {session.data?.user?.isAdmin && <AdminLink/>}
    </div>
  )
}

export default ButtonAuth
