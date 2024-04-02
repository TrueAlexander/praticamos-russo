'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
//Components
import Button from '@/components/Button/Button'
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'

export default function Atividades() {
  const router = useRouter()
  const session = useSession()

  const [nameShow, setNameShow] = useState("Visitante")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')

  const name = session.data?.user?.name || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Visitante")
    } 
    if(session.status === "unauthenticated") router.push('/')
  }, [session.status])

  const handleClick = (e) => e.target.innerText === "Teste" ? router.push('/atividades/teste') : router.push('/atividades/aprender')
  
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
        <p className='text-white p-4 py-6 font-bold text-[22px]'>Escolha a atividade abaixo:</p>
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          clique para começar
        </p>
        <Button
          text="Aprender" 
          disabled={false} 
          onClick={handleClick} 
        />
        <br />
        <Button
          text="Teste" 
          disabled={false} 
          onClick={handleClick} 
        />
        <br />
        <Button
          text="Jogar" 
          disabled={true} 
          onClick={handleClick} 
        />
      </div>
    )
  } 
}
