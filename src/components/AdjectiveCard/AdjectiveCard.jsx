import { CgPlayButtonO } from "react-icons/cg"
import { useEffect, useState } from "react"
import AnswersAnt from "../AnswersAnt/AnswersAnt"

const AdjectiveCard = ({adjective, adjectives, answer, setAnswer, evaluation, setEvaluation}) => {

  
  useEffect(() => {
    answer === adjective.antonyms_ru.masc ? setEvaluation(true) : setEvaluation(false)
  }, [answer])
  
  const handlePlay = () => {
    const audio = document.getElementById("audio")
    audio.pause()
    audio.load()
    audio.play()
  }

  return (
    <div className='py-[3px] text-white text-[20px]'>
      <p className='text-[#9f50ac]  text-[15px] mb-3'>Para o adjetivo</p>
      <h3 className="inline-block mr-2">
        {/* audio */}
        <div className='inline-block mr-2'>
          <div 
            htmlFor="audio"
            onClick={handlePlay}
            className='ml-3 inline-block hover:text-[#a050ac] active:text-[#a050ac] text-lg'
          >
            <CgPlayButtonO />
          </div>
          <audio 
            id="audio"
            controls 
            className="mx-auto hidden"
          >
            <source 
              src={adjective.audios.masc} 
              type="audio/mpeg" 
            />
            Your browser does not support the audio tag.
          </audio>
        </div>
        {/* audio */}
        {adjective.russian.masc}
      </h3>
      <p className='text-[#9f50ac] text-[16px] inline-block'>{adjective.portuguese.masc}</p>
      <div className="mt-4">
        {!answer ? 
        <h3 className="w-[85px] mr-2 inline-block  border rounded-md border-dotted">. . .</h3>
        :
        <h3 className="mr-2 inline-block">
          <div className={evaluation 
            ? "bg-[url('/true.png')] h-[19px] w-[19px] bg-cover bg-center inline-block mr-2" 
            : "bg-[url('/false.png')] h-[19px] w-[19px] bg-cover bg-center inline-block mr-2"}>           
          </div>
          {answer}    
        </h3>}
        <p className='text-[#9f50ac] text-[16px] inline-block'>{adjective.antonyms_pt.masc}</p>
      </div>
      <p className='text-[#9f50ac] text-[15px] mt-3 mb-1'>escolha um antônimo abaixo:</p>
      <AnswersAnt
       adjective={adjective}
       adjectives={adjectives}
       setAnswer={setAnswer}
       answer={answer}
      />  
    </div>     
  )
}

export default AdjectiveCard