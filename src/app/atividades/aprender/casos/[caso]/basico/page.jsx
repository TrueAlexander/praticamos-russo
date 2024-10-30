'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { shuffleArray } from "@/utils/arrayUtils"
// import casesQuestions from "../../../../../../../dataCasesBasic.json"
//Components
import Button from '@/components/globals/Button/Button'
import ButtonAuth from "@/components/globals/ButtonAuth/ButtonAuth"
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'
import QuizCases from '@/components/cases/QuizCases/QuizCases'


const TOTAL_QUESTIONS = 5

export default function CasoBasico({params}) {
  const router = useRouter()
  const session = useSession()

  const [nameShow, setNameShow] = useState("Visitante")
  const [isLoading, setIsLoading] = useState(session.status === 'loading')

  const [questions, setQuestions] = useState([0])

  const name = session.data?.user?.name || null
  // const email = session.data?.user?.email || null

  useEffect(() => {
    setIsLoading(session.status === 'loading')
    if(session.status === "authenticated") {  
    }
    if (session.data?.user?.name) {
      setNameShow(session.data?.user?.name)
    } else {
      setNameShow("Visitante")
    } 
    if(session.status === "unauthenticated") router.push('/')
  }, [session.status, router, session.data?.user?.name])

  ////
    useEffect(() => {

    const caseBasic = params.caso

    const getBasicCases = async (caseBasic) => {
      try {
        const data = await fetch("/api/case/get-cases-basic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({caseBasic})
        }) 
        if (data.status === 201) {
          const results = await data.json() 
          const arrayRes = results.res
          const qArray = arrayRes.map(question => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
          }))
            setQuestions(qArray)
            setIsLoading(false)
          } else {
            setQuestions([]) 
          }
        }     
       catch (error) {
        console.log(error)
        confirmAlert({
          message: "Infelizmente, o servidor não está disponível. Por favor, tente novamente mais tarde.",
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
              }
            }
          ]
        })
      }   
    }
    getBasicCases(caseBasic)
  }, [])
  ///

  const shuffledQuestions = shuffleArray(questions)

  
  if (isLoading || questions.length === 1) {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (session.status === "authenticated" && shuffledQuestions.length > 4) {
    return (
      <div className='text-center flex flex-col justify-center' >
        <div className='absolute top-0 left-0 right-0'>
          <ButtonAuth name={name} signOut={signOut} nameShow={nameShow} setIsLoading={setIsLoading}/>
        </div>  
        <p className='text-white p-3 pt-6 font-bold text-[22px]'>Escolha uma resposta certa:</p>
        {/* <p className='text-[#9f50ac] text-[18px] '>
          clique aqui 
        </p> */}
        <QuizCases questions={shuffledQuestions} totalQuestions={TOTAL_QUESTIONS} caso={"case"}/>
        {/* <Button
          text="Básico"
          addStyle={"my-2"}
          disabled={false} 
          onClick={() => router.push('/atividades/aprender/casos/preposicional/basico')} 
        /> */}
        <p className='text-[#9f50ac] pb-1 text-[18px] '>
          ou
        </p>
        <Button
          text="Voltar" 
          learnt={false}
          disabled={false} 
          onClick={() => router.push(`/atividades/aprender/casos/${params.caso}`)} 
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



// const QuizPage = ({params}) => {
  
//   const category = params.cat
//   const [questions, setQuestions] = useState([])
//   const [isLoading, setIsLoading] = useState(true)



//   const shuffledNewQuestions = shuffleArray(questions)
//   // const questions = await getQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

//   if (isLoading) {
//     return (
//       <div className="flex-auto flex flex-col justify-center">
//         <Loading/> 
//       </div>
//     )
//   } else if (shuffledNewQuestions.length > 10) {
//     return ( 
//       <Quiz questions={shuffledNewQuestions} totalQuestions={TOTAL_QUESTIONS} category={category}/>
//     )
//   } else {
//     return (
//       <div className='text-center flex flex-col justify-center'>     
//           <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não foi encontrada.</p>    
//       </div>
//     )
//   }
 
// }

// export default QuizPage