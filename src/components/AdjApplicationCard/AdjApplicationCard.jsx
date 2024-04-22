import { CgPlayButtonO } from "react-icons/cg"
import { useEffect, useState } from "react"
import AnswersAnt from "../AnswersAnt/AnswersAnt"

const AdjApplicationCard = ({adjective, adjectives, answer, setAnswer, evaluation, setEvaluation}) => {

  
  // useEffect(() => {
  //   answer === adjective.antonyms_ru.masc ? setEvaluation(true) : setEvaluation(false)
  // }, [answer])


  return (
    <div className='py-[3px] text-white text-[20px]'>
      <p className='text-[#9f50ac] text-[15px] mb-3'>traduza a frase abaixo</p>
      <h3 className="inline-block">
        {adjectives[0].expression_pt}
      </h3>
      <p className='text-[#9f50ac]  text-[15px] my-3'>digite o adjetivo apropriado:</p>
      <input type="text" className="inline-block bg-inherit border border-solid text-white rounded-md px-2"/>
      <h3 className="inline-block">
        {adjectives[0].noun_ru}
      </h3>


      {/* <p className='text-[#9f50ac] text-[16px] inline-block'>{"adjective.portuguese.masc"}</p>
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
        <p className='text-[#9f50ac] text-[16px] inline-block'>{"adjective.antonyms_pt.masc"}</p>
      </div>
      <p className='text-[#9f50ac] text-[15px] mt-3 mb-1'>escolha um antônimo abaixo:</p> */}
      {/* <AnswersAnt
       adjective={adjective}
       adjectives={adjectives}
       setAnswer={setAnswer}
       answer={answer}
      />   */}
    </div>     
  )
}

export default AdjApplicationCard