'use client'
//utils
import { shuffleArray } from "@/utils/arrayUtils"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useEffect, useState } from "react"
import dataCards from '../../../../dataCards.json'
//Components
import Vocabulary from "../../../components/Vocabulary/Vocabulary"
import Loading from "../loading"
import { useSearchParams } from "next/navigation"
const TOTAL_QUESTIONS = 10

const VocabularyPage = ({params}) => {
  
  const searchParams = useSearchParams()
  const repeat = searchParams.get('rep')
  const category = params.cat
  
// Function to shuffle the cards for a given activity
function shuffleCards(activity) {
  const shuffledCards = [...activity.cards];
  for (let i = shuffledCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]]
  }
  return shuffledCards
}

// Function to shuffle cards for all activities in the imported array
function shuffleAllCards(data) {
  return data.map(activity => ({
    ...activity,
    cards: shuffleCards(activity),
  }))
}

// Use the shuffled array
const preparedData = shuffleAllCards(dataCards)

  ///to filter dataCards according to category
  //later to use only the filtered array

  const [questions, setQuestions] = useState(preparedData)
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {

  //   const getQuestionsMongoDB = async (category)=> {
  //     try {
  //       const data = await fetch("/api/get-questions", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({category})
  //       }) 
  //       if (data.status === 201) {
  //         const results = await data.json() 
  //         const arrayRes = results.res
  //         const qArray = arrayRes.map(question => ({
  //           ...question,
  //           answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  //         }))
  //           setQuestions(qArray)
  //           setIsLoading(false)
  //         } else {
  //           setQuestions([]) 
  //         }
  //       }     
  //      catch (error) {
  //       console.log(error)
  //       confirmAlert({
  //         message: "Infelizmente, o servidor não está disponível. Por favor, tente novamente mais tarde.",
  //         buttons: [
  //           {
  //             label: 'Ok',
  //             onClick: () => {
  //             }
  //           }
  //         ]
  //       })
  //     }   
  //   }
  //   getQuestionsMongoDB(category)
  // }, [])

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
      <>
        <Vocabulary 
          questions={shuffledNewQuestions} 
          totalQuestions={TOTAL_QUESTIONS} 
          category={category}
          repeat={repeat}
        />
      </>
      
    )
  } else {
    return (
      <div className='text-center flex flex-col justify-center'>     
          <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não foi encontrada.</p>    
      </div>
    )
  }
 
}

export default VocabularyPage