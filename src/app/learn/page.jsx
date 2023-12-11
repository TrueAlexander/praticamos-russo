'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import getResults from '@/utils/getResults'
//Components
import Button from '@/components/Button/Button'
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'

export default function Learn() {
  const router = useRouter()
  const session = useSession()

  const [nameShow, setNameShow] = useState("Desconhecido")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')

  const name = session.data?.user?.name || null
  const email = session.data?.user?.email || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')

    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Visitante")
    } 
    if(session.status === "unauthenticated") router.push('/')
  }, [session.status])
  

  if (isLoading) {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (session.status === "authenticated") {
    return (
      <div className='text-center flex flex-col justify-center' >
        <div className='absolute top-0 left-0 right-0'>
          <ButtonAuth name={name} signOut={signOut} nameShow={nameShow} setIsLoading={setIsLoading}/>
        </div>  
        <p className='text-white p-4 py-6 font-bold text-[22px]'>Escolhe o tema em baixo:</p>
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          clique para começar
        </p>
        <Button
          text="Vocabulario - Comida" 
          disabled={false} 
          onClick={() => router.push('/learn/vocabulary-food')} 
        />
        <Button
          text="Vocabulario - Cidade" 
          disabled={false} 
          onClick={() => router.push('/learn/vocabulary-city')} 
        />
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          disabled={false} 
          onClick={() => router.push('/activities')} 
        />
      </div>
    )
  } 
}
