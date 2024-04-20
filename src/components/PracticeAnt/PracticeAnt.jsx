import { useEffect, useState } from "react"
import Loading from "@/app/loading"
import Button from "../Button/Button"
import AdjectiveCard from "../AdjectiveCard/AdjectiveCard"

const PracticeAnt = ({adjectives}) => {

  const [answer, setAnswer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [visible, setVisible] = useState(false)
  const [currentAdjIndex, setCurrentAdjIndex] = useState(0)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    currentAdjIndex !== 0 ? setVisible(true) : setVisible(false)
  }, [currentAdjIndex])


  const handleChangeAdjective = (step) => {
    setAnswer(null)
    const newAdjIndex = currentAdjIndex + step
    if (newAdjIndex  < 0 || newAdjIndex  >= adjectives.length) {
      return
    }
    setCurrentAdjIndex(newAdjIndex)

  }

  const handleClickForward = () => {
    setAnswer(null)
    if(currentAdjIndex === adjectives.length - 1) {
      console.log('ao inicio')
    } else {
      handleChangeAdjective(1)
    }
  }

  return (
    <>
      {isLoading 
      ? <div className="flex-auto flex flex-col   justify-center">
          <Loading/> 
        </div>
      : 
      <div className="text-white text-center justify-center">
        <AdjectiveCard
          answer={answer}
          setAnswer={setAnswer}
          adjective={adjectives[currentAdjIndex]}
          adjectives={adjectives}
        />
        <div className="flex justify-center mt-6">
          {visible && <Button 
            text={currentAdjIndex === adjectives.length - 1 ? `Ao início` :`Anterior`}
            disabled={false}
            onClick={currentAdjIndex === adjectives.length - 1 ? () => setCurrentAdjIndex(0) : () => handleChangeAdjective(-1)} 
          />}
          <Button
            addStyle={currentAdjIndex === adjectives.length - 1 && 'hidden'}
            disabled={currentAdjIndex !== adjectives.length - 1 ? false : true}
            text="Próximo"
            onClick={handleClickForward}
          />
        </div>
      </div>
    }
    </>

  )
}

export default PracticeAnt