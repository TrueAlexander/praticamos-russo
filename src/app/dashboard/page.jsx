'use client'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
//Components
import Button from '@/components/Button/Button'
import AuthModal from '@/components/AuthModal/AuthModal'
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'
//Homepage Image
import HomepageImage from '@/assets/home-pic.jpg'
// import { confirmAlert } from 'react-confirm-alert'
// import '@/utils/react-confirm-alert.css'

export default function Dashboard() {
  const router = useRouter()
  const session = useSession()
  const params = useSearchParams()

  const [showModal, setShowModal] = useState(params.get("error") || false)
  const [nameShow, setNameShow] = useState("Desconhecido")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')
 

  const name = session.data?.user?.name || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')
  }, [session.status])


  useEffect(() => {
    if (session.data?.user?.name) {

        setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Desconhecido")
    }
  }, [session])

  const handleClick = () => session.status === "authenticated" ? router.push('/categories') : setShowModal(true)
 //////
  if (session.status === "loading") {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (session.status === "authenticated") {
    return (
      <div className='text-center flex flex-col justify-center min-w-[350px]' >
        <ButtonAuth setShowModal={setShowModal} name={name} signOut={signOut} nameShow={nameShow} setIsLoading={setIsLoading}/>
        <p className='text-white p-4 py-6 font-bold text-[22px]'>Praticamos russo!</p>
        <p className='text-white text-[18px]'>{name}, seus melhores resultados:</p>
        <ul className='text-[#9f50ac] text-[20px] font-bold text-left my-5'>
          <li className='flex justify-between'>
            <p>Vocabulario</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>0 </span>  de  <span className='text-white text-[22px]'>0 </span></p>
          </li>
          <li className='my-4 flex justify-between'>
            <p>Verbos</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>0 </span>  de  <span className='text-white text-[22px]'>0 </span></p>
          </li>
          <li className='flex justify-between'>
            <p>Casos</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>0 </span>  de  <span className='text-white text-[22px]'>0 </span></p>
          </li>
        </ul>
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          clique para praticar
        </p>
        <Button k
          text="Categorias" 
          disabled={false} 
          onClick={handleClick} 
        />
        {showModal && <AuthModal showModal={showModal} setShowModal={setShowModal} setIsLoading={setIsLoading}/>}   
      </div>
    )
  } else {
    router.push('/')
  }
}
