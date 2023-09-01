import { IoClose } from "react-icons/io5"

const QuestionForm = ({category, setQuestionFormShow}) => {

  const handleClose = () => {
    setQuestionFormShow(false)
  }

  return (
    <div>
      <button
          onClick={ handleClose }
          className="text-white text-[22px] absolute right-4 md:right-56 top-0 scale-125"
        >  
          <IoClose/></button>
      <form 
        className="form" 
        // onSubmit={handleSubmit}
      >
        <div className="mt-3">
          <p className="text-[#9f50ac] text-[17px]">Pergunta:</p>
          <textarea name="" id="" className='block mx-auto px-2 py-1 bg-transparent text-white rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
          required 
          >

          </textarea>
        </div>
        <div className="my-2">
          <p className="text-[#9f50ac] text-[17px]">Resposta correta:</p>
          <input
            className='px-2 py-1 bg-transparent text-white rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="answer"
            minLength={1}
            required 
          />
        </div>
        <div className="my-2">
          <p className="text-[#9f50ac] text-[17px]">Resposta incorreta #1:</p>
          <input
            className='px-2 py-1 bg-transparent text-white rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="answer"
            minLength={1}
            required 
          />
        </div>
        <div className="my-2">
          <p className="text-[#9f50ac] text-[17px]">Resposta incorreta #2:</p>
          <input
            className='px-2 py-1 bg-transparent text-white rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="answer"
            minLength={1}
            required 
          />
        </div>
        <div className="my-2">
          <p className="text-[#9f50ac] text-[17px]">Resposta incorreta #3:</p>
          <input
            className='px-2 py-1 bg-transparent text-white rounded-md w-[97%] text-[16px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
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
