'use client'
import { useRouter, useSearchParams } from "next/navigation"
import Button from "@/components/globals/Button/Button"
import { FC } from 'react'

const NoticePage: FC = () => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const user = searchParams.get('user')
  const messageOriginal = searchParams.get('message')
  if (messageOriginal === "email_verified") {
    const message = 'Seu e-mail foi verificado. Muito obrigado!'
    return (
      <div className='text-white text-center text-[20px] flex flex-col justify-center'>
        <p className='text-white p-4 font-bold'>{`Prezado ${user}!`}</p>
        <p className="p-6 text-[#9f50ac] font-bold text-[18px]" >{`${message}`}</p>
        <p className="lowercase text-white text-[16px] mb-6">Por favor, retorne ao aplicativo e faça login para começar.</p>
        <Button text='Voltar!' disabled={false} onClick={() => router.push("/")}/>
      </div> 
    )
  }
  // Optional fallback if message is not 'email_verified'
  return null
}

export default NoticePage
