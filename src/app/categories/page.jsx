'use client'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
//Components
import Button from '@/components/Button/Button'

const Categories = () => {
  
  const router = useRouter()
  const handleClick = (e) => router.push(`/categories/${e.target.name}`)

  return (
    <div className='text-center flex flex-col justify-center'>
     <p className='text-white p-4 font-bold text-[22px]'>Praticamos russo!</p>
      <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
        Escolhe a categoria de perguntas:
      </p>
      <Button text='Vocabulario' name='vocabulary' disabled={false} onClick={handleClick} />
      <br />
      <Button text='Verbos' name='verbs' disabled={false} onClick={handleClick} />
      <br />
      <Button text='Casos' name='cases' disabled={false} onClick={handleClick} />
      <br />
    </div>
  )
}

export default Categories