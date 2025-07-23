'use client'
import { useSearchParams } from "next/navigation"
import Button from "@/components/globals/Button/Button"
import { useRouter } from "next/navigation"
import showEmojis from "@/utils/showEmojis"

const AppResultado = () => {
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const result = searchParams.get('res')
  const total = searchParams.get('total')

  const handleClick = () => router.push('/atividades/aprender/adjetivos') 

  return ( 
    <div className='text-white text-center uppercase flex flex-col justify-center'>
      <p className='text-white p-4 font-bold text-[25px]'>Seu resultado:</p>
      <div className="text-[25px]">{showEmojis(result, total)}</div>
      {/* <p className="p-6 text-[#9f50ac] font-bold text-[24px]" >{category}</p> */}
      <p className="p-6  font-bold text-[25px]" >{result} <span className='text-[18px] text-[#9f50ac] lowercase'>de</span> {total}</p>
      <p className="lowercase text-[#9f50ac] mb-6">clique para voltar:</p>
      <Button text='Voltar' disabled={false} onClick={handleClick}/>
    </div>   
   )
}

export default AppResultado