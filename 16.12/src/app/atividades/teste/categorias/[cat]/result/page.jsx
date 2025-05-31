"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import Button from '@/components/globals/Button/Button'
import showEmojis from '@/utils/showEmojis'

const QuizResultPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const result = searchParams.get('res')
  const total = searchParams.get('total')
  const category = searchParams.get('cat')
  const user = searchParams.get('user')

  const handleClick = () => router.push('/atividades/teste') 

  return (
    <div className='text-white text-center uppercase flex flex-col justify-center'>
      <p className='text-white p-4 font-bold text-[22px]'>{`${user}, seu resultado:`}</p>
      <div className="text-[25px]">{showEmojis(result, total)}</div>
      <p className="px-6 py-2 text-[#9f50ac] font-bold text-[20px]" >{category}</p>
      <p className="px-6 py-2 font-bold text-[25px]" >{result} <span className='text-[18px] text-[#9f50ac] lowercase'>de</span> {total}</p>
      <p className="lowercase text-[#9f50ac] mb-6">Tente realizar o teste novamente</p>
      <Button text='Praticar mais!' disabled={false} onClick={handleClick}/>
    </div>  
  )
}

export default QuizResultPage