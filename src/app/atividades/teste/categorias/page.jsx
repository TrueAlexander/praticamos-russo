'use client'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
//Components
import Button from '@/components/globals/Button/Button'
import Loading from '../loading'
import OnlyNameShow from '@/components/globals/OnlyNameShow/OnlyNameShow'

const Categories = () => {
  const session = useSession()
  const router = useRouter()
  const nameShow = session.data?.user?.name

  const handleClick = (e) => router.push(`/atividades/teste/categorias/${e.target.name}`)

  if (session.status === "loading") {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  }
  if (session.status === "authenticated") {
    return (
      <div className='text-center flex flex-col justify-center'>
       <OnlyNameShow nameShow={nameShow}/>
       <p className='text-white p-4 font-bold text-[22px]'>Bora praticar!</p>
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          Escolhe uma categoria de perguntas:
        </p>
        <Button name='vocabulario' text='Vocabulário' disabled={false} onClick={handleClick} />
        <Button addStyle='my-4' name='verbos' text='Verbos' disabled={false} onClick={handleClick} />
        <Button name='casos' text='Casos' disabled={false} onClick={handleClick} />
        <p className='text-[#9f50ac] pt-1 pb-1 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          disabled={false} 
          onClick={() => router.push('/atividades/teste')} 
        />
      </div>
    )
  } else return (
    <div className='text-center flex flex-col justify-center'>     
       <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não foi encontrada.</p>    
    </div>
  )
}

export default Categories