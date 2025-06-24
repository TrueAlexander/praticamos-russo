"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import Button from '@/components/globals/Button/Button'
import showEmojis from '@/utils/showEmojis'

const SyllableResultPage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const result = Number(searchParams.get('res'))
  const total = Number(searchParams.get('total'))
  const variation = searchParams.get('var')
  const user = searchParams.get('user')

  const title: Record<string, string> = {
  "consoante%2Bvogal": "I",
  "vogal%2Bconsoante": "II",
  "consoante%2Bvogal%2Bconsoante": "III"
}

  const key = encodeURIComponent(variation || '')

  const handleClick = () => router.push('/atividades/aprender/alfabeto/silabas') 

  if (!result || !total || !variation || !user) {
    return (
      <div className="text-white text-center flex flex-col justify-center">
        <p className="p-6 text-[20px] text-red-500">Parâmetros inválidos ou incompletos.</p>
        <Button text='Voltar' disabled={false} onClick={handleClick} />
      </div>
    )
  }

  return (
    <div className='text-white text-center flex flex-col justify-center'>
      <p className='text-white p-4 font-bold text-[22px]'>{`${user}, seu resultado:`}</p>
      <p className="px-6 text-white text-[20px]" >{`Leitura de sílabas ${title[key]}`}</p>
      <p className="px-6 py-2 text-[#9f50ac] text-[20px] tracking-[0.05em]" >{variation}</p>
      <div className="text-[25px]">{showEmojis(result, total)}</div>
      <p className="px-6 py-2 font-bold text-[25px]" >{result} <span className='text-[18px] text-[#9f50ac] lowercase'>de</span> {total}</p>
      <p className="lowercase text-[#9f50ac] mb-6">clique para continuar</p>
      <Button text='Voltar' disabled={false} onClick={handleClick}/>
    </div>  
  )
}

export default SyllableResultPage