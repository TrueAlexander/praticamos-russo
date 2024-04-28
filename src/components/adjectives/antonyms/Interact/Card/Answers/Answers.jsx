import { useEffect, useState } from 'react'
import { shuffleArray } from '@/utils/arrayUtils'

const Answers = ({ setAnswer, answer, adjective, adjectives}) => {

  const [array, setArray] = useState()

  useEffect(() => {
    const currentAdj = adjective.russian.masc
    const currentAnt = adjective.antonyms_ru.masc
    const dataAnt = adjectives.map(adj => adj.antonyms_ru.masc)
    const antonymsArr = dataAnt.filter(item => item !== currentAnt && item !== currentAdj)
    const shuffledThreeAntonyms = shuffleArray(antonymsArr).slice(0, 3)
    const optionsArr = shuffledThreeAntonyms.concat(currentAnt)

    setArray(shuffleArray(optionsArr))
  }, [adjective, adjectives])
  
  const clickChoose = (e) => setAnswer(e.target.innerText)
  
  return (
    <div className="flex h-[80px] w-[230px] mt-2 border flex-wrap text-white text-sm p-1 bg-[#a050ac4e] rounded-md ml-auto mr-auto">
      {array?.map(item => (
        <span
          className={`inline-block border border-dotted h-min px-1 rounded-md w-min mb-3 mr-1 ml-1 p-1 cursor-pointer justify-start text-[16px] ${answer === item && `opacity-20`}`}
          onClick={clickChoose} 
          key={item}>
            {item}
        </span>
      ))} 
    </div>
  )
}

export default Answers