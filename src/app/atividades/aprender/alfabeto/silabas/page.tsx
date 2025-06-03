"use client"
import Loading from "../loading"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import Button from '@/components/globals/Button/Button'

const Silabas = (): JSX.Element | null => {

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
          <p className='text-white p-3 pt-6 font-bold text-[22px]'>Lemos silabas</p>
          <p className='text-[#9f50ac] text-[18px] '>
           escolha uma atividade: 
          </p>
          <Button 
            addStyle={"my-2"} 
            text="Sílabas fáceis I" 
            disabled={false} 
            onClick={() => router.push('/atividades/aprender/alfabeto/silabas/cv')} 
          />
          <Button 
            addStyle={"my-2"} 
            text="Sílabas fáceis II" 
            disabled={true} 
            onClick={() => router.push('/atividades/aprender/alfabeto/silabas/vc')} 
          />
          <Button 
            addStyle={"my-2"} 
            text="Sílabas completas" 
            disabled={true} 
            onClick={() => router.push('/atividades/aprender/alfabeto/silabas/cvc')} 
          />
          <p className='text-[#9f50ac] pb-1 text-[18px] '>
            ou
          </p>
          <Button
            text="Voltar" 
            disabled={false} 
            onClick={() => router.push('/atividades/aprender/alfabeto')} 
          />
        </div>
      )
    } 
    return null
}

export default Silabas