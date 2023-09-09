"use client"
import Button from "../Button/Button"
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Loading from "@/app/loading"
import { useRouter } from 'next/navigation'
import QuestionForm from "../QuestionForm/QuestionForm"
import "animate.css"
import { IoClose } from "react-icons/io5"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const AdminQuestions = ({questions, category}) => {
  const session = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [questionsList, setQuestionsList] = useState(questions.questions)
  const [questionFormShow, setQuestionFormShow] = useState(false)

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

  console.log(questionsList)

  const criarClick = async () => {
    setQuestionFormShow(true)
    ///appear a form to fill with question details and a button submit

    ///after fullfill the form and press the submit button
   // /????????????setQuestionsList((prev) => prev.push(formData)))))
    //the new question send to database POST  - to receive feedback
  }

  ///useEffect() if temporaryQuestions changes re render the component
  const clickDelete =  (e) => {

    const _id = e.currentTarget.getAttribute('data-id')
    const question = e.currentTarget.getAttribute('data-question')

    confirmAlert({
      message: `Admin, você está seguro que quer apagar no banco de dados a pergunta: ${question}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {

            
            try {
              const res = await fetch("/api/admin/delete-question", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({_id}),
              })

              if (res.status === 201) {
                console.log('test')
                confirmAlert({
                  message: "Prezado Admin, a pergunta foi apagada com sucesso!",
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () => {
                        // setShowModal(false)
                        // setIsLoading(false)
                      }
                    }
                  ]
                })
              } else {
                confirmAlert({
                  message: "Prezado Admin, esta pergunta não existe no banco de dados, será que foi apagada anteriormente...",
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () => {
                        // setShowModal(false)
                        // setIsLoading(false)
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
          <div key={item._id} className="bg-green-400 mb-5">
            <button 
              data-id={item._id}
              data-question={item.question}
              className="text-[30px] block text-red-400 cursor-pointer w-fit mr-0 ml-auto"
              onClick={clickDelete}
            >
              <IoClose/>
            </button>
            {item.question}
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
            {questionsList.length < 1 ? <h3>Eita! A lista das perguntas de <span>{category}</span> está vazia...</h3> : renderQuestions(questionsList)}
          </div>
        </div>}
        {questionFormShow && <QuestionForm category={category} setQuestionFormShow={setQuestionFormShow} />}
      </div>
    )
  } 
}

export default AdminQuestions
