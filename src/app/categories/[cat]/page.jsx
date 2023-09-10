'use client'
//utils
import { shuffleArray } from "@/utils/arrayUtils"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useEffect, useState } from "react"
//Components
import Quiz from "../../../components/Quiz/Quiz"
import Loading from "../loading"
const TOTAL_QUESTIONS = 10

const QuizPage = ({params}) => {
  
  const category = params.cat
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const getQuestionsMongoDB = async (category)=> {
      try {
        const data = await fetch("/api/get-questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({category})
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
          message: "Infelizmente o servidor não está disponivel, tente mais tarde!",
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
    getQuestionsMongoDB(category)
  }, [])

  const shuffledNewQuestions = shuffleArray(questions)
  // const questions = await getQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

  if (isLoading) {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (shuffledNewQuestions.length > 10) {
    return ( 
      <Quiz questions={shuffledNewQuestions} totalQuestions={TOTAL_QUESTIONS} category={category}/>
    )
  } else {
    return (
      <div className='text-center flex flex-col justify-center'>     
          <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não existe!</p>    
      </div>
    )
  }
 
}

export default QuizPage