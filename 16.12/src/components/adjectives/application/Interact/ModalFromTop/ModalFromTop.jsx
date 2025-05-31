import "animate.css"
import TrueModal from "../TrueModal/TrueModal"
import FalseModal from "../FalseModal/FalseModal"

const ModalFromTop = ({showModal, setShowModal, evaluation, setCurrentAdjIndex, currentAdjIndex, answer, correctAnswer, setAnswer, numberQuestions, result, setIsLoading}) => {

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div 
      className={showModal ? "opacity-1 z-50 pointer-events-auto w-full h-full fixed top-0 left-0 bg-[#2b2737] show animate__animated animate__fadeInDown" : "opacity-0 pointer-events-none w-full h-full fixed top-0 left-0 bg-[#2b2737]"} 
      onClick={ handleClose }
    >   
      <div 
        className="absolute left-10 right-10 top-10 bottom-10 rounded-lg my-0 mx-auto max-w-[400px] border-2 border-[#9f50ac] scale-100 ease-in duration-1000 text-center flex flex-col justify-center items-center overflow-hidden modalContent"
        onClick={e => e.stopPropagation()}
      >
        {evaluation === "green" ? 
          <TrueModal
            setCurrentAdjIndex={setCurrentAdjIndex}
            currentAdjIndex={currentAdjIndex}
            setShowModal={setShowModal}
            answer={answer}
            correctAnswer={correctAnswer}
            setAnswer={setAnswer}
            numberQuestions={numberQuestions}
            result={result}
            setIsLoading={setIsLoading}
          /> 
          : 
          <FalseModal
            setCurrentAdjIndex={setCurrentAdjIndex}
            currentAdjIndex={currentAdjIndex}
            setShowModal={setShowModal}
            answer={answer}
            correctAnswer={correctAnswer}
            setAnswer={setAnswer}
            numberQuestions={numberQuestions}
            result={result}
            setIsLoading={setIsLoading}
          />}
      </div>
    </div>
  )
}

export default ModalFromTop

