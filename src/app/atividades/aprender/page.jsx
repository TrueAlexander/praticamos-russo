'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import getResults from '@/utils/getResults'
//Components
import Button from '@/components/globals/Button/Button'
import ButtonAuth from "@/components/globals/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'


export default function Aprender() {
  const router = useRouter()
  const session = useSession()

  const [nameShow, setNameShow] = useState("Visitante")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')

  const name = session.data?.user?.name || null
  // const email = session.data?.user?.email || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')
    if(session.status === "authenticated") {  
    }
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Visitante")
    } 
    if(session.status === "unauthenticated") router.push('/')
  }, [session.status])

  ////

  
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
        <p className='text-white p-3 pt-6 font-bold text-[22px]'>Escolha o que quer aprender:</p>
        <p className='text-[#9f50ac] text-[18px] '>
          clique para começar 
        </p>
        <Button
          text="Palavras novas"
          addStyle={"my-2"}
          disabled={false} 
          onClick={() => router.push('/atividades/aprender/vocabulario')} 
        />
        <Button
          text="Conjugar verbos"
          addStyle={"my-2"} 
          disabled={false} 
          onClick={() => router.push('/atividades/aprender/conjugacao')} 
        />
        <Button
          text="Adjetivos"
          addStyle={"my-2"} 
          disabled={false} 
          onClick={() => router.push('/atividades/aprender/adjetivos')} 
        />
        <Button
          text="Audição"
          addStyle={"my-2"} 
          disabled={true} 
          onClick={() => router.push('/atividades/aprender/conjugacao')} 
        />
        <p className='text-[#9f50ac] pb-1 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          learnt={false}
          disabled={false} 
          onClick={() => router.push('/atividades')} 
        />
      </div>
    )
  } 
}
