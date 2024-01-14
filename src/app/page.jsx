'use client'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
//Components
import Button from '@/components/Button/Button'
import AuthModal from '@/components/AuthModal/AuthModal'
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"
import AdminLink from '@/components/AdminLink/AdminLink'
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'
//Homepage Image
import HomepageImage from '@/assets/home-pic.jpg'

export default function Home() {
  const router = useRouter()
  const session = useSession()
  const params = useSearchParams()

  const [showModal, setShowModal] = useState(params.get("error") || false)
  const [nameShow, setNameShow] = useState("Visitante")
  // const [isLoading, setIsLoading] = useState(session.status === 'loading')
  const [isLoading, setIsLoading] = useState(true)
 

  const name = session.data?.user?.name || null

  useEffect(() => {
    // setIsLoading(session.status === 'loading')
    if (session.status !== 'loading') {
      setIsLoading(false)
    }
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Visitante")
    }
  }, [session.status])

  const handleClick = () => session.status === "authenticated" ? router.push('/atividades') : setShowModal(true)

  return (
    <div className='text-center flex flex-col justify-center'>
      {isLoading 
        ? <Loading/>
        : <>
            <ButtonAuth setShowModal={setShowModal} name={name} signOut={signOut} nameShow={nameShow} setIsLoading={setIsLoading}/>
            <div className='bg-green-300 var-content-class'>
              <p className='text-white p-4 font-bold uppercase tracking-widest text-[24px]'>Russolinguo</p>
              <Image className='max-w-[400px] w-[80%] mx-auto rounded-[10px]' src={HomepageImage} alt='home-page' priority={false} placeholder="blur"/>
              <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
                Clique abaixo
              </p>
              <Button 
                text={session.status === "authenticated" ? "Começar!" : "Entrar"} 
                disabled={false} 
                onClick={handleClick} 
              />
            </div>           
            {showModal && <AuthModal showModal={showModal} setShowModal={setShowModal} setIsLoading={setIsLoading}/>}
            {session.data?.user?.isAdmin && <AdminLink/>}
          </>
      }    
    </div>
  )
}
