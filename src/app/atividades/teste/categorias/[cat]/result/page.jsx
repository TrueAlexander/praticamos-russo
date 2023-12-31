"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'

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
      <p className='text-white p-4 font-bold'>{`${user}, seu resultado:`}</p>
      <p className="p-6 text-[#9f50ac] font-bold text-[24px]" >{category}</p>
      <p className="p-6  font-bold text-[34px]" >{result} <span className='text-[24px] text-[#9f50ac] lowercase'>de</span> {total}</p>
      <p className="lowercase text-[#9f50ac] mb-6">Tente realizar o teste novamente</p>
      <Button text='Praticar mais!' disabled={false} onClick={handleClick}/>
    </div>  
  )
}

export default QuizResultPage