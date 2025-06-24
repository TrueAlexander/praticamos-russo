"use client"
import Loading from "../loading"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Button from '@/components/globals/Button/Button'

const Alfabeto = (): JSX.Element | null => {

  const router = useRouter()
  const session = useSession()

  const [isLoading, setIsLoading] = useState<boolean>(session.status === 'loading')

  useEffect(() => {
      setIsLoading(session.status === 'loading')
  
 
      if(session.status === "unauthenticated") router.push('/')
    }, [session.status, router])


  if (isLoading) {
      return (
        <div className="flex-auto flex flex-col justify-center">
          <Loading/> 
        </div>
      )
    } else if (session.status === "authenticated") {
      return (
        <div className='text-center flex flex-col justify-center' >
          <p className='text-white p-3 pt-6 font-bold text-[22px]'>Alfabeto / leitura</p>
          <p className='text-[#9f50ac] text-[18px] '>
           clique para começar: 
          </p>
          <Button 
            addStyle={"my-2"} 
            text="Ler sílabas" 
            disabled={false} 
            onClick={() => router.push('/atividades/aprender/alfabeto/silabas')} 
          />
           {/* <Button 
            addStyle={"my-2"} 
            text="Ler palavras" 
            disabled={true} 
            onClick={() => router.push('/atividades/aprender/alfabeto/silabas')} 
          /> */}
          <p className='text-[#9f50ac] mt-4 pb-1 text-[18px] '>
            ou
          </p>
          <Button
            text="Voltar" 
            disabled={false} 
            onClick={() => router.push('/atividades/aprender')} 
          />
        </div>
      )
    } 
    return null
}

export default Alfabeto