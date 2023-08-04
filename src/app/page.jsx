'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
//Components
import Button from '@/components/Button/Button'
import AuthModal from '@/components/AuthModal/AuthModal'
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"

//Homepage Image
import HomepageImage from '@/assets/home-pic.jpg'

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const router = useRouter()
  return (
    <div className='text-center flex flex-col justify-center'>
      <ButtonAuth setShowModal={setShowModal}/>
      <p className='text-white p-4 font-bold text-[22px]'>Praticamos russo!</p>
      <Image className='max-w-[400px] w-[80%] mx-auto rounded-[10px]' src={HomepageImage} alt='home-page'/>
      <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
        Clique abaixo
      </p>
      <Button text='Começar!' disabled={false} onClick={() => router.push('/categories')} />
      {showModal && <AuthModal showModal={showModal} setShowModal={setShowModal}/>}
    </div>
  )
}
