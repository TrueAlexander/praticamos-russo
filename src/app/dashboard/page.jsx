'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import getResults from '@/utils/getResults'
//Components
import Button from '@/components/Button/Button'
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'

export default function Dashboard() {
  const router = useRouter()
  const session = useSession()
  // const TOTAL_QUESTIONS = 10

  const [nameShow, setNameShow] = useState("Visitante")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')
  const [statScores, setStatScores] = useState()

  const statVocabulario = statScores?.filter(item => item.hasOwnProperty('vocabulario'))[0]?.vocabulario.toFixed(1) || 0
  const statVerbos = statScores?.filter(item => item.hasOwnProperty('verbos'))[0]?.verbos.toFixed(1) || 0
  const statCasos = statScores?.filter(item => item.hasOwnProperty('casos'))[0]?.casos.toFixed(1) || 0

  const name = session.data?.user?.name || null
  const email = session.data?.user?.email || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')

    if(session.status === "authenticated") {
      getResults(email, name).then(result => setStatScores(result))  
    }
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Visitante")
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
      <div className='text-center flex flex-col justify-center' >
        <div className='absolute top-0 left-0 right-0'>
          <ButtonAuth name={name} signOut={signOut} nameShow={nameShow} setIsLoading={setIsLoading}/>
        </div>  
        <p className='text-white p-4 py-6 font-bold text-[22px]'>Praticamos russo!</p>
        <p className='text-white text-[18px]'>{nameShow.length > 12 ? nameShow.slice(0, 9) + "..." : nameShow}, suas estatísticas totais de respostas certas:</p>
        <ul className='text-[#9f50ac] text-[20px] font-bold text-left my-5'>
          <li className='flex justify-between'>
            <p>Vocabulário</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>{statVocabulario} </span>  %  
            {/* <span className='text-white text-[22px]'>{TOTAL_QUESTIONS} </span> */}
            </p>
          </li>
          <li className='my-4 flex justify-between'>
            <p>Verbos</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>{statVerbos} </span>  %  
            {/* <span className='text-white text-[22px]'>{TOTAL_QUESTIONS} </span> */}
            </p>
          </li>
          <li className='flex justify-between'>
            <p>Casos</p>
            <p className='text-[18px]'><span className='text-white text-[22px]'>     {statCasos} </span>  %  
            {/* <span className='text-white text-[22px]'>{TOTAL_QUESTIONS} </span> */}
            </p>
          </li>
        </ul>
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          clique para melhorar
        </p>
        <Button
          text="Categorias" 
          disabled={false} 
          onClick={handleClick} 
        />
        <p className='text-[#9f50ac] pt-1 pb-1 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          disabled={false} 
          onClick={() => router.push('/activities')} 
        />
      </div>
    )
  } 
}
