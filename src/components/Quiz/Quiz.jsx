'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

//Components
import Button from "@/components/Button/Button"
import QuestionCard from "@/components/QuestionCard/QuestionCard"
import Loading from "@/app/loading"

const Quiz = ({questions, totalQuestions, category}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false

  const router = useRouter()

  const handleOnAnswerClick = (answer, currentQuestionIndex) => {
    //if user has already answered, do nothing
    if (isQuestionAnswered) return
    //check answer against correct answer
    const isCorrect = questions[currentQuestionIndex].correct_answer === answer
    //add score if answer is correct
    if (isCorrect) setScore(prev => prev + 1)
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
    // setTimeout(() => setIsLoading(false),  1000) 
    setIsLoading(false)
  }, [questions])

  const handleClickForward = () => {

    if(currentQuestionIndex === totalQuestions - 1) {
      // const queryParams: resultProps = { result: score }
     
      router.push(`/categories/${category}/result?cat=${category}&res=${score}&total=${totalQuestions}`)
    } else {
      handleChangeQuestion(1)
    }
  }

  return (
    <>
      {isLoading 
      ? <div className="flex-auto flex flex-col justify-center">
          <Loading/> 
        </div>  
      : <div className="text-white text-center mt-5 grow-0 flex flex-col justify-center">
          {/* <p className="p-6 pb-4 font-bold text-[20px]">Resultado: {score}</p> */}
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
}

export default Quiz