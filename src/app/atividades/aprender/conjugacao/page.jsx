'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import getResults from '@/utils/getResults'
//Components
import Button from '@/components/globals/Button/Button'
import ButtonAuth from "@/components/globals/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'

export default function Conjugacao() {
  const router = useRouter()
  const session = useSession()

  const [nameShow, setNameShow] = useState("Visitante")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')

  const name = session.data?.user?.name || null
  const email = session.data?.user?.email || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')

    if(session.status === "authenticated") {
      // getLearnt(email, name).then(result => setLearntArr(result))  
    }
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Visitante")
    } 
    if(session.status === "unauthenticated") router.push('/')
  }, [session.status, router, session.data?.user?.name])

  
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
        <p className='text-white p-3 pt-6 font-bold text-[22px]'>Escolha um tempo verbal:</p>
        <p className='text-[#9f50ac] text-[18px] '>
          clique para aprender e/ou praticar conjugação 
        </p>
        <Button 
          addStyle={"my-2"} 
          text="Presente" 
          // learnt={learntArr?.includes(`${item.category}`)}
          disabled={false} 
          onClick={() => router.push('/atividades/aprender/conjugacao/presente')} 
        />
        <Button 
          addStyle={"my-2"} 
          text="Passado" 
          // learnt={learntArr?.includes(`${item.category}`)}
          disabled={false} 
          onClick={() => router.push('/atividades/aprender/conjugacao/passado')}
        />
        <p className='text-[#9f50ac] pb-1 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          learnt={false}
          disabled={false} 
          onClick={() => router.push('/atividades/aprender')} 
        />
      </div>
    )
  } 
}
