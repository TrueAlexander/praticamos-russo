'use client'
//utils
import { shuffleArray } from "@/utils/arrayUtils"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useEffect, useState } from "react"
import { useSession, signOut } from 'next-auth/react' 
import dataVerbsPresent from '../../../../../../dataVerbsPresent.json'
import dataVerbsPast from '../../../../../../dataVerbsPast.json'
//Components
import Loading from "../loading"
import { useSearchParams } from "next/navigation"
import Button from "@/components/Button/Button"
import OnlyNameShow from '@/components/OnlyNameShow/OnlyNameShow'
import { useRouter } from "next/navigation"


const VerbTense = ({params}) => {
  
  const router = useRouter()
  const session = useSession()

  const nameShow = session.data?.user?.name
  // const searchParams = useSearchParams()
  // const repeat = searchParams.get('rep')
  const tense = params.tempo
  const dataVerbs = tense === "passado" ? dataVerbsPast : dataVerbsPresent
  console.log(dataVerbs)
// Function to shuffle the cards for a given activity
// function shuffleCards(activity) {
//   const shuffledCards = [...activity.cards];
//   for (let i = shuffledCards.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]]
//   }
//   return shuffledCards
// }

// Function to shuffle cards for all activities in the imported array
// function shuffleAllCards(data) {
//   return data.map(activity => ({
//     ...activity,
//     cards: shuffleCards(activity),
//   }))
// }

// Use the shuffled array
// const preparedData = shuffleAllCards(dataCards)
// ///to filter dataCards according to category
//   const filteredByCat = preparedData.filter(item => item.category === category)
//   //later to use only the filtered array

//   const [questions, setQuestions] = useState(filteredByCat)

  // const [isLoading, setIsLoading] = useState(session.status === 'loading')

  

  if (session.status === "loading") {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (session.status === "authenticated") {
    return ( 
      <div className='fixed z-[10000] top-0 bottom-0 overflow-y-auto bg-[#2b2737] text-center flex flex-col justify-center' >
          {/* <OnlyNameShow nameShow={nameShow}/> */}
          <p className='text-white p-1 font-bold text-[22px]'>Tempo {tense.charAt(0).toUpperCase() + tense.slice(1)}</p>
          <p className='text-[#9f50ac] p-1 text-[18px]'>Escolhe um verbo:</p>
          {dataVerbs.map(verb =>(
              <Button
                key={verb.id}
                addStyle={"my-2"} 
                text={verb.infinitive} 
                disabled={false} 
                onClick={() => router.push(`/atividades/aprender/conjugacao/${tense}/${verb.id}`)}
              />
              )
          )}
          <p className='text-[#9f50ac] pt-1 pb-1 text-[18px] '>
            ou
          </p>
          <Button
            text="Voltar" 
            disabled={false} 
            onClick={() => router.push('/atividades/aprender/conjugacao')} 
          />
      </div>    
    )
  } else {
    return (
      <div className='text-center flex flex-col justify-center'>     
          <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não foi encontrada.</p>    
      </div>
    )
  }
 
}

export default VerbTense