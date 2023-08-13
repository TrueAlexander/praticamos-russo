'use client'
import { IoClose } from "react-icons/io5"
import { useRouter, useSearchParams } from "next/navigation"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import AskRecover from "@/components/AskRecover/AskRecover"
import PassSend from "@/components/PassSend/PassSend"
import { useEffect, useState } from "react"

const PasswordRecover = () => {

  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")

  const [modeAsk, setModeAsk] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (mode === "pass") setModeAsk(false)
  }, [])
  
  return (
    <div 
      className="opacity-1 pointer-events-auto w-full h-full fixed top-0 left-0 bg-[#2b2737] show animate__animated animate__fadeIn animate__slower"
    >
      <div 
        className="absolute left-10 right-10 top-10 bottom-10 rounded-lg my-0 mx-auto max-w-[400px]  ease-in duration-1000 text-center flex flex-col justify-center items-center overflow-hidden"
      >
        <button
          onClick={() => router.push("/")}
          title="Voltar"
          className="text-white text-[22px] absolute right-3 top-3 scale-125"
        >  
        <IoClose/></button>
        {modeAsk ? <AskRecover setModeAsk={setModeAsk}/> : <PassSend setModeAsk={setModeAsk}/>}
      </div>
    </div>
  )
}

export default PasswordRecover
