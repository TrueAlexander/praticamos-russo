'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
//Components
import Button from "@/components/Button/Button"
import Loading from "@/app/loading"
import OnlyNameShow from "../OnlyNameShow/OnlyNameShow"
import VocabularyExercise from "../VocabularyExercise/VocabularyExercise"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { shuffleArray } from "@/utils/arrayUtils"

const Vocabulary = ({questions, totalQuestions, category, repeat}) => {

  const router = useRouter()
  const session = useSession()
  const nameShow = session.data?.user?.name
  const email = session.data?.user?.email
  
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
 
  //visibility of the anterior button  
  const [visible, setVisible] = useState(false)

  //disabled Proxima button
  const [disabled, setDisabled] = useState(true)

  const rightAnswer = questions[currentQuestionIndex].name


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

  const handleClickForward = async () => {

    if(currentQuestionIndex === totalQuestions - 1) {
      //send the information to database that the category was learnt
      setIsLoading(true)
      try {
        const res = await fetch("/api/update-vocabulary", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            category
          }),
        })
  
        if (res.status === 201 || 200) {
          console.log("Seu resultado foi salvo")      
        }
        
      } catch (err) {   
        console.log(err, "Ocorreu um erro do lado do servidor!")
      }   
     
      router.push(`/atividades/aprender/vocabulario/${category}/result?user=${nameShow}&rep=${repeat}`)
    } else {
      //if the previous question was responded correctly
      handleChangeQuestion(1)
    }
  }

  const handleClickReturn = () => {
    confirmAlert({
      message: `${nameShow}, tem certeza de que deseja sair da atividade?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => router.push('/atividades/aprender')  
        },
        {
          label: 'Não',
          // onClick: () => console.log('Click No')
        }
      ]
    })
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
            <OnlyNameShow nameShow={nameShow}/>
            {/* <p className="text-[#9f50ac] font-bold pb-2 text-[16px]">
              Pergunta {currentQuestionIndex + 1} de {totalQuestions}
            </p> */}
            <VocabularyExercise
              currentQuestionIndex={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              answers={questions[currentQuestionIndex].cards}
              rightAnswer={rightAnswer}
              setDisabled={setDisabled}            
              // userAnswer={userAnswers[currentQuestionIndex]}
              // correctAnswer={questions[currentQuestionIndex].correct_answer
            />
            <div className="flex flex-col justify-center mt-6">
              <div>
                {visible && <Button 
                  text="Anterior"
                  disabled={false}
                  onClick={() => handleChangeQuestion(-1)} 
                />}
                <Button
                  disabled={disabled}
                  text={currentQuestionIndex === totalQuestions - 1 ? 'Fim' : 'Próxima'}
                  onClick={handleClickForward}
                />
              </div> 
              <p className='text-[#9f50ac] pt-1 pb-1 text-[18px] '>
                ou
              </p>
              <div>
                <Button
                  text="Voltar"
                  addStyle="w-16 mx-auto h-6"
                  disabled={false} 
                  onClick={handleClickReturn} 
                />
              </div>        
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

export default Vocabulary

