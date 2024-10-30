'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import getResults from '@/utils/getResults'
import CreateCaseBasic from '@/components/cases/QuizCases/CreateCaseBasic'
//Components
import Button from '@/components/globals/Button/Button'
import ButtonAuth from "@/components/globals/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'


export default function Caso({params}) {
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
  }, [session.status, router, session.data?.user?.name])

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
        <p className='text-white p-3 pt-6 font-bold text-[22px]'>{`Caso ${params.caso.charAt(0).toUpperCase() + params.caso.slice(1)}`}</p>
        <p className='text-[#9f50ac] text-[18px] '>
          clique para começar 
        </p>
        <Button
          text="Básico"
          addStyle={"my-2"}
          disabled={false} 
          onClick={() => router.push(`/atividades/aprender/casos/${params.caso}/basico`)} 
        />
        <Button
          text="Avançado"
          addStyle={"my-2"} 
          disabled={true} 
          onClick={() => router.push('/atividades/aprender/casos/genitivo')} 
        />
        <CreateCaseBasic/>
        <p className='text-[#9f50ac] pb-1 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          learnt={false}
          disabled={false} 
          onClick={() => router.push('/atividades/aprender/casos')} 
        />
      </div>
    )
  } 
}
