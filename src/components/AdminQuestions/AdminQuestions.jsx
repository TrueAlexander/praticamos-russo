"use client"
import Button from "../Button/Button"
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Loading from "@/app/loading"
import { useRouter } from 'next/navigation'
import QuestionForm from "../QuestionForm/QuestionForm"

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




  if (isLoading) {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (isAdmin) {
    return (
      <div className='text-center flex flex-col justify-center text-white' >
        {!questionFormShow && <Button name="Criar" text="Criar pergunta nova" disabled={false} onClick={criarClick}/>}
        {questionFormShow && 
        <>
          <QuestionForm />
          {/* <Button name="Guardar" text="Guardar " disabled={false} onClick={()=>'sent to DB'}/> */}
        </>}
        {questionsList.length < 1 ? <h3>Lista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novas: Lista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novasLista de perguntas de <p>{category}</p> esta vazia, adicione perguntas novas</h3> : <h4>question</h4>}

        {/* add a button Send new List of questions to Database */}
      </div>
    )
  } 
}

export default AdminQuestions
