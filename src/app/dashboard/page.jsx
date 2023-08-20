'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import getBestScores from '@/utils/getBestScores'
//Components
import Button from '@/components/Button/Button'
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'

export default function Dashboard() {
  const router = useRouter()
  const session = useSession()
  const TOTAL_QUESTIONS = 10

  const [nameShow, setNameShow] = useState("Desconhecido")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')
  const [bestScores, setBestScores] = useState()

  const bestVocabulario = bestScores?.filter(item => item.hasOwnProperty('vocabulario'))[0]?.vocabulario || 0
  const bestVerbos = bestScores?.filter(item => item.hasOwnProperty('verbos'))[0]?.verbos || 0
  const bestCasos = bestScores?.filter(item => item.hasOwnProperty('casos'))[0]?.casos || 0

  const name = session.data?.user?.name || null
  const email = session.data?.user?.email || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')

    if(session.status === "authenticated") {
      getBestScores(email, name).then(result => setBestScores(result))  
    }
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Desconhecido")
    } 
    if(session.status === "unauthenticated") router.push('/')
  }, [session.status])

  const handleClick = () => router.push('/categories')

  if (isLoading) {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (session.status === "authenticated") {
    return (
      // <div className='text-center flex flex-col justify-center w-[350px] max-w-[80%] mx-auto' >
      <div className='text-center flex flex-col justify-center' >
        <ButtonAuth name={name} signOut={signOut} nameShow={nameShow} setIsLoading={setIsLoading}/>
        <p className='text-white p-4 py-6 font-bold text-[22px]'>Praticamos russo!</p>
        <p className='text-white text-[18px]'>{name}, seus melhores resultados:</p>
        <ul className='text-[#9f50ac] text-[20px] font-bold text-left my-5 w-[350px] max-w-[80%] mx-auto'>
          <li className='flex justify-between'>
            <p>Vocabulário</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>{bestVocabulario} </span>  de  <span className='text-white text-[22px]'>{TOTAL_QUESTIONS} </span></p>
          </li>
          <li className='my-4 flex justify-between'>
            <p>Verbos</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>{bestVerbos} </span>  de  <span className='text-white text-[22px]'>{TOTAL_QUESTIONS} </span></p>
          </li>
          <li className='flex justify-between'>
            <p>Casos</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>{bestCasos} </span>  de  <span className='text-white text-[22px]'>{TOTAL_QUESTIONS} </span></p>
          </li>
        </ul>
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          clique para praticar
        </p>
        <Button
          text="Categorias" 
          disabled={false} 
          onClick={handleClick} 
        />
      </div>
    )
  } 
}
