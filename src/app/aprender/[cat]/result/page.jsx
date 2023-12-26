"use client"

import Button from "@/components/Button/Button"
import { useRouter, useSearchParams } from "next/navigation"

const VocabResultPage = ({params}) => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const user = searchParams.get('user')
  const category = params.cat

  const handleClick = () => router.push('/aprender') 

  return (
    <div className='text-white text-center uppercase flex flex-col justify-center'>
      <p className='text-white p-4 font-bold text-[20px]'>{`${user}, muito bem!`}</p>
      <p className="p-2 text-[#9f50ac] font-bold lowercase text-[20px]" >aprendeu o vocabulário de</p>
      <p className="p-2 font-bold text-[20px] text-white" >{`${category}`}</p>
      <p className="p-2 text-[#9f50ac] font-bold text-[20px]" >sucessivamente!</p>
      <p className="lowercase text-[#9f50ac] mt-8 mb-6">clique para seguir</p>
      <Button text='Voltar a aprender!' disabled={false} onClick={handleClick}/>
    </div> 
  )
}

export default VocabResultPage