'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import getResults from '@/utils/getResults'
//Components
import Button from '@/components/Button/Button'
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'
import getLearnt from '@/utils/getLearnt'
import dataCards from '../../../../../dataCards.json'

export default function Vocabulario() {
  const router = useRouter()
  const session = useSession()

  const [nameShow, setNameShow] = useState("Visitante")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')

  const name = session.data?.user?.name || null
  const email = session.data?.user?.email || null

  const [learntArr, setLearntArr] = useState()

  useEffect(() => { 
    setLearntArr(learntArr)
  }, [learntArr])

  useEffect(() => {
    setIsLoading(session.status === 'loading')

    if(session.status === "authenticated") {
      getLearnt(email, name).then(result => setLearntArr(result))  
    }
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Visitante")
    } 
    if(session.status === "unauthenticated") router.push('/')
  }, [session.status])

  ////
  const renderCategories = (array) => {
 
    const uniqueObjectsArraySet = Array.from(new Set(array.map(obj => obj.category)))
      .map(category => array.find(obj => obj.category === category))
    return uniqueObjectsArraySet.map((item) => {
      return <Button 
        key={item.id}
        addStyle={"my-2"} 
        text={item.category} 
        learnt={learntArr?.includes(`${item.category}`)}
        disabled={false} 
        onClick={() => router.push(`/atividades/aprender/vocabulario/${item.category}?rep=${learntArr?.includes(item.category)}`)} 
      /> 
    })
  }
  
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
        <p className='text-white p-3 pt-6 font-bold text-[22px]'>Escolhe o tema em baixo:</p>
        <p className='text-[#9f50ac] text-[18px] '>
          clique para aprender novas palavras 
        </p>
        <p className='text-[#9f50ac] pb-2 text-[18px] '>
          ou reforçe o vocabulário aprendido:
        </p>
        {renderCategories(dataCards)}
        <p className='text-[#9f50ac] pb-1 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          learnt={false}
          disabled={false} 
          onClick={() => router.push('/atividades/aprender')} 
        />
      </div>
    )
  } 
}
