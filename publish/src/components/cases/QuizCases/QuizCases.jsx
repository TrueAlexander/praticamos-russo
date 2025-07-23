'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
//Components
import Button from "@/components/globals/Button/Button"
import QuestionCard from "@/components/teste/QuestionCard/QuestionCard"
import Loading from "@/app/loading"

const QuizCases = ({questions, totalQuestions, caso}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [result, setResult] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false

  const router = useRouter()
  const session = useSession()
  const nameShow = session.data?.user?.name

  const handleOnAnswerClick = (answer, currentQuestionIndex) => {
    //if user has already answered, do nothing
    if (isQuestionAnswered) return
    //check answer against correct answer
    const isCorrect = questions[currentQuestionIndex].correct_answer === answer
    //add result + 1 if answer is correct
    if (isCorrect) setResult(prev => prev + 1)
    //save the answer in the object for user answer
    setUserAnswers(prev => ({...prev, [currentQuestionIndex]: answer}))
  }

  const handleChangeQuestion = (step) => {
    const newQuestionIndex = currentQuestionIndex + step
    if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) {
      return
    }
    setCurrentQuestionIndex(newQuestionIndex) 
  }

  useEffect(() => {
    currentQuestionIndex !== 0 ? setVisible(true) : setVisible(false)
  }, [currentQuestionIndex])

  useEffect(() => {
    setIsLoading(false)
  }, [questions])

  const handleClickForward = () => {

    if(currentQuestionIndex === totalQuestions - 1) {     
      router.push(`/atividades/aprender/casos/instrumental/result?user=${nameShow}&case=${caso}&res=${result}&total=${totalQuestions}`)
    } else {
      handleChangeQuestion(1)
    }
  }

  if (session.status === "loading") {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  }
  if (session.status === "authenticated") {
    return (
      <>
        {isLoading 
        ? <div className="flex-auto flex flex-col justify-center">
            <Loading/> 
          </div>  
        : <div className="text-white text-center mt-5 grow-0 flex flex-col justify-center">
            <p className="text-[#9f50ac] font-bold pb-2 text-[16px]">
              Pergunta {currentQuestionIndex + 1} de {totalQuestions}
            </p>
            <QuestionCard 
              currentQuestionIndex={currentQuestionIndex}
              question={questions[currentQuestionIndex].question}
              answers={questions[currentQuestionIndex].answers}
              userAnswer={userAnswers[currentQuestionIndex]}
              correctAnswer={questions[currentQuestionIndex].correct_answer}
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
                text={currentQuestionIndex === totalQuestions - 1 ? 'Fim' : 'Próxima'}
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

export default QuizCases

