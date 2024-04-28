import { useEffect, useState } from "react"
import Loading from "@/app/loading"
import Card from "./Card/Card"
import ModalFromTop from "./ModalFromTop/ModalFromTop"
import TrueModal from "./TrueModal/TrueModal"
import FalseModal from "./FalseModal/FalseModal"


const Interact = ({adjectives}) => {

  const [result, setResult] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [currentAdjIndex, setCurrentAdjIndex] = useState(0)
  const [evaluation, setEvaluation] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const numberQuestions = adjectives.length

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    currentAdjIndex !== 0 ? setVisible(true) : setVisible(false)
  }, [currentAdjIndex])

  useEffect(() => {
    if (adjectives[currentAdjIndex].answers.includes(answer)) {
      setEvaluation("green")
      setResult(prev => prev + 1)
      } else if (answer && !adjectives[currentAdjIndex].answers.some(item => item === answer)) {
      setEvaluation("red")
    } else setEvaluation(null)
  },[answer])

  return (
    <>
      {isLoading 
      ? <div className="flex-auto flex flex-col justify-center">
          <Loading/> 
        </div>
      : 
      <div className="text-white text-center justify-center">
        <Card
          answer={answer}
          setAnswer={setAnswer}
          adjective={adjectives[currentAdjIndex]}
          adjectives={adjectives}
          evaluation={evaluation}
          setEvaluation={setEvaluation}
          visible={visible}
          setVisible={setVisible}
          currentAdjIndex={currentAdjIndex}
          setCurrentAdjIndex={setCurrentAdjIndex}
          setShowModal={setShowModal}
        />
        {showModal && 
          <ModalFromTop 
            showModal={showModal}
            setCurrentAdjIndex={setCurrentAdjIndex}
            currentAdjIndex={currentAdjIndex}
            setShowModal={setShowModal}
            answer={answer + " " + adjectives[currentAdjIndex].noun_ru}
            correctAnswer={adjectives[currentAdjIndex].exp_ru}
            setAnswer={setAnswer}
            numberQuestions={numberQuestions}
            result={result}
            setIsLoading={setIsLoading}
            evaluation={evaluation}

           
        />}
      </div>
    }
    </>
  )
}

export default Interact



