import Button from "@/components/globals/Button/Button"
import { useRouter } from "next/navigation"


const TrueModal = ({ answer, correctAnswer, setCurrentAdjIndex, currentAdjIndex, setShowModal, numberQuestions, result, setIsLoading}) => {
  const router = useRouter()

  const handleClick = () => {
    if (currentAdjIndex < numberQuestions - 1) {
      setCurrentAdjIndex(prev => prev + 1)
    } else {
      setIsLoading(true)
      router.push(`./aplicacao/resultado?res=${result}&total=${numberQuestions}`)
    } 
    //add setIsLoading
    setShowModal(false)
  }

  return (
    <div className="text-white text-[20px]">
      <h3 className="text-[24px] inline-block my-3">Sucesso!&#128512;</h3>
      <p className='text-[#9f50ac] text-[15px]'>sua resposta:</p>
      <h3 className=" my-3">
        {answer}
      </h3>
      <p className='text-[#9f50ac] text-[15px]'>resposta certa:</p>
      <h3 className=" pb-2 my-3 underline">
        {correctAnswer}
      </h3>
      <p className='text-[#9f50ac] text-[15px]'>seu resultado:</p>
      <h3 className=" pb-2 my-3  text-[18px]">{result}<span className="text-[#9f50ac] text-[15px]"> de </span>{numberQuestions}</h3>
      <Button
        text="Próximo"
        addStyle="text-[14px]"
        onClick={handleClick}
      />
    </div>

  )
}

export default TrueModal