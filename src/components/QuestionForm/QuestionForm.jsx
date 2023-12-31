import { IoClose } from "react-icons/io5"
import "animate.css"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const QuestionForm = ({category, setQuestionFormShow, setAnchorUpdate, setIsLoading}) => {

  const handleClose = () => {
    setQuestionFormShow(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/create-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          question: e.target[0].value,
          correct_answer: e.target[1].value,
          answers: [
            e.target[1].value, 
            e.target[2].value,
            e.target[3].value,
            e.target[4].value
          ],
          incorrect_answers: [
            e.target[2].value,
            e.target[3].value,
            e.target[4].value
          ],
        }),
      })

      if (res.status === 201) {
        confirmAlert({
          message: "Prezado Admin, a pergunta foi criada com sucesso!",
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                setAnchorUpdate(prev => !prev)
                setIsLoading(false)
                setQuestionFormShow(false)
              }
            }
          ]
        })
      } else if (res.status === 400) {
        confirmAlert({
          message: "Prezado Admin, esta pergunta já existe no banco de dados. Por favor, crie outra pergunta.",
          buttons: [
            {
              label: 'Ok',
              onClick: () => {
                // setShowModal(false)
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

  return (
    <div className="animate__animated animate__fadeIn">
      <button
          onClick={ handleClose }
          className="text-white text-[22px] absolute right-4 md:right-56 top-4 scale-125"
        >  
          <IoClose/></button>
      <form 
        className="form" 
        onSubmit={handleSubmit}
      >
        <div className="mt-3">
          <p className="text-[#9f50ac] text-[17px]">Pergunta:</p>
          <textarea name="" id="" className='block resize-none mx-auto px-2 py-1 bg-transparent text-white rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
          required 
          >

          </textarea>
        </div>
        <div className="my-2">
          <p className="text-[#9f50ac] text-[17px]">Resposta correta:</p>
          <input
            className='px-2 py-1 bg-transparent text-green-600 rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="answer"
            minLength={1}
            required 
          />
        </div>
        <div className="my-2">
          <p className="text-[#9f50ac] text-[17px]">Resposta incorreta #1:</p>
          <input
            className='px-2 py-1 bg-transparent text-red-600 rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="answer"
            minLength={1}
            required 
          />
        </div>
        <div className="my-2">
          <p className="text-[#9f50ac] text-[17px]">Resposta incorreta #2:</p>
          <input
            className='px-2 py-1 bg-transparent text-red-600 rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="answer"
            minLength={1}
            required 
          />
        </div>
        <div className="my-2">
          <p className="text-[#9f50ac] text-[17px]">Resposta incorreta #3:</p>
          <input
            className='px-2 py-1 bg-transparent text-red-600 rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="answer"
            minLength={1}
            required 
          />
        </div>
        <button 
          className="bg-[#9f50ac] select-none font-bold h-[30px] min-w-[100px] rounded-[10px] text-white mr-2 ml-2 mt-3 active:scale-95" 
          type="submit"
          title='Guardar'
        >
          Guardar
        </button>
      </form>
    </div>
  )
}

export default QuestionForm
