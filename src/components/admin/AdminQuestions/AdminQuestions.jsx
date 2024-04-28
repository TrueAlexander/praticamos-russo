"use client"
import Button from '@/components/globals/Button/Button'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Loading from "@/app/loading"
import { useRouter } from 'next/navigation'
import QuestionForm from "../QuestionForm/QuestionForm"
import "animate.css"
import { IoClose } from "react-icons/io5"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const AdminQuestions =  ({category, questions, setAnchorUpdate, anchorUpdate}) => {
  const session = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [questionsList, setQuestionsList] = useState(questions)
  const [questionFormShow, setQuestionFormShow] = useState(false)

  //admin authentication
  useEffect(() => {
    if (session.status === "loading") {
      setIsLoading(true)
    } else if (session.status === "unauthenticated") {
      router.push('/')
    } else {
      if(session.data.user.isAdmin) {
        setIsLoading(false)
        setIsAdmin(true)
      } else {
        router.push('/')
      }
    }
  }, [session.status])

  //update questions list for render when it was changed
  useEffect(() => {
    setQuestionsList(questions)
  }, [questions])

  const criarClick = async () => {
    setQuestionFormShow(true)
  }

  const clickDelete =  (e) => {
    const _id = e.currentTarget.getAttribute('data-id')
    const question = e.currentTarget.getAttribute('data-question')

    confirmAlert({
      message: `Admin, você está certo de que deseja apagar no banco de dados a pergunta: ${question}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            setIsLoading(true)        
            try {
              const res = await fetch("/api/admin/delete-question", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({_id}),
              })

              if (res.status === 201) {
              
                confirmAlert({
                  message: "Prezado Admin, a pergunta foi apagada com sucesso!",
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: async () => {
                        setAnchorUpdate(prev => !prev)
                        setIsLoading(false)
                      }
                    }
                  ]
                })
              } else {
                confirmAlert({
                  message: "Prezado Admin, esta pergunta não consta no banco de dados. Será que foi apagada anteriormente?",
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () => {
                        setIsLoading(false)
                      }
                    }
                  ]
                })
              }               
            } catch (error) {
              console.log(error)
            }     
          }
        },
        {
          label: 'Não',
          // onClick: () => console.log('Click No')
        }
      ]
    })

  }

  const renderQuestions = (questionsList) => {
    return (
      questionsList.map(item => {
        return (
          <div key={item._id} className="border border-[#9f50ac] rounded-md mb-5 py-1 pl-3 text-[14px] font-medium">
            <button 
              data-id={item._id}
              data-question={item.question}
              className="text-[30px] float-right block text-red-600 cursor-pointer w-fit mr-0 ml-auto"
              onClick={clickDelete}
            >
              <IoClose/>
            </button>
            <p>{item.question}</p>
            <div className="text-left flex">
              <div className="flex-1 border-r">
                <p className="text-green-600  text-center border-b">{item.correct_answer}</p>
                <p className="text-red-600  text-center">{item.incorrect_answers[0]}</p>
              </div>
              <div className="flex-1">
                <p className="text-red-600  text-center border-b">{item.incorrect_answers[1]}</p>
                <p className="text-red-600  text-center">{item.incorrect_answers[2]}</p>
              </div>
            </div>    
          </div>
        )
      })
    )
  }

  if (isLoading) {
    return (
      <div className="flex-auto flex flex-col justify-center items-center">
        <Loading/> 
      </div>
    )
  } else if (isAdmin) {
    return (
      <div className='text-center flex flex-col justify-center text-white' >
      <p className='text-[#9f50ac] text-[20px]'>Categoria:   <span    className="text-white font-bold capitalize">{category}</span></p>
        {!questionFormShow && 
        <div className="my-5 animate__animated animate__fadeIn">
          <Button name="Criar" text="Criar pergunta nova" disabled={false} onClick={criarClick}/>
          <div className="my-4">
            {questionsList.length < 1 ? <h3>Ops! A lista de perguntas de <span>{category}</span> está vazia...</h3> : renderQuestions(questionsList)}
          </div>
        </div>}
        {questionFormShow && <QuestionForm category={category} setQuestionFormShow={setQuestionFormShow} setAnchorUpdate={setAnchorUpdate} setIsLoading={setIsLoading}/>}
      </div>
    )
  } 
}

export default AdminQuestions
