'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
//Components
import Button from "@/components/globals/Button/Button"
import SyllableCard from "./SyllableCard"
import Loading from "@/app/loading"

// Types
interface Exercise {
  _id: string
  syllable: string
  audioUrl?: string
  // audioUrl: string
  options: string[]
  correctOption: string
  variation: string
}

interface QuizSyllableProps {
  exercises: Exercise[]
  totalExercises: number
  variation: string
}

const QuizSyllable: React.FC<QuizSyllableProps> = ({exercises, totalExercises, variation}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0)
  const [result, setResult] = useState<number>(0)
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({})
  const [visible, setVisible] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const isQuestionAnswered: boolean = userAnswers[currentExerciseIndex] ? true : false

  const router = useRouter()
  const { data: sessionData, status: sessionStatus }  = useSession()
  const nameShow = sessionData?.user?.name

  const handleOnAnswerClick = (answer: string, currentExerciseIndex: number) => {
    //if user has already answered, do nothing
    if (isQuestionAnswered) return
    //check answer against correct answer
    const isCorrect: boolean = exercises[currentExerciseIndex].correctOption === answer
    //add result + 1 if answer is correct
    if (isCorrect) setResult(prev => prev + 1)
    //save the answer in the object for user answer
    setUserAnswers(prev => ({...prev, [currentExerciseIndex]: answer}))
  }

  const handleChangeQuestion = (step: number) => {
    const newQuestionIndex = currentExerciseIndex + step
    if (newQuestionIndex < 0 || newQuestionIndex >= totalExercises) {
      return
    }
    setCurrentExerciseIndex(newQuestionIndex) 
  }

  useEffect(() => {
    setVisible(currentExerciseIndex !== 0)
  }, [currentExerciseIndex])

  useEffect(() => {
    setIsLoading(false)
  }, [exercises])

  const handleClickForward = () => {

    if(currentExerciseIndex === totalExercises - 1) {     
      router.push(`/atividades/aprender/alfabeto/silabas/${variation}/result?user=${nameShow}&res=${result}&total=${totalExercises}&var=${variation}`)
    } else {
      handleChangeQuestion(1)
    }
  }

  if (sessionStatus === "loading") {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  }
  if (sessionStatus === "authenticated") {
    return (
      <>
        {isLoading 
        ? <div className="flex-auto flex flex-col justify-center">
            <Loading/> 
          </div>  
        : <div className="text-white text-center mt-2 grow-0 flex flex-col justify-center">
            <p className="text-[#9f50ac] pb-2 text-[16px]">
              Pergunta {currentExerciseIndex + 1} de {totalExercises}
            </p>
            <SyllableCard 
              currentExerciseIndex={currentExerciseIndex}
              exercise={exercises[currentExerciseIndex].syllable}
              options={exercises[currentExerciseIndex].options}
              userAnswer={userAnswers[currentExerciseIndex]}
              correctOption={exercises[currentExerciseIndex].correctOption}
              onClick={handleOnAnswerClick}
            />
            <div className="flex justify-center mt-6">
              {visible && <Button 
                text="Anterior"
                disabled={false}
                onClick={() => handleChangeQuestion(-1)} 
              />}
              <Button
                disabled={false}
                text={currentExerciseIndex === totalExercises - 1 ? 'Fim' : 'Próxima'}
                onClick={handleClickForward}
              />
            </div>
          </div>}
      </>   
    )
  } else {
    return (
      <div className='text-center flex flex-col justify-center'>     
        <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não foi encontrada.</p>    
      </div>)
  }
}

export default QuizSyllable

