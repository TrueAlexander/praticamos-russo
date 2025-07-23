import { useEffect, useState,useCallback } from 'react'
import AnswersVerb from './AnswersVerb/AnswersVerb'

const InteractVerb = ({conjugations, pronouns}) => {

    //check results after interaction:
    const [checkResults, setCheckResults] = useState(false)

    //chosen answers by user from Answer component
    const [chosen, setChosen] = useState()
    const arrFromChosen = chosen ? chosen.split(" ") : []
    const result = arrFromChosen.filter((elem, ind) => ind > 0 ? elem : "")
    //set an array with results of comparison
    const [evaluation, setEvaluation] = useState([])

    //compare result array from user with the corect one
    const compare = useCallback(() => {
      const arrModel = conjugations.map(item => {
        return Object.values(item).map(i => {
          return i[1]
        })
      })
      setEvaluation(arrModel.map((el, index) => {
        if (el[0] === result[index]) {
          return true
        } else return false
      }))
    }, [conjugations, result])

    useEffect(() => {
      if (checkResults) {
        compare()
      }}, [checkResults])

    return (
      <>
        {!checkResults ? conjugations.map((item, index) => {
          const arrayAnswers = Object.values(item)
          return arrayAnswers.map(answer => {
            return (
              <div 
                key={index}
                className='text-white my-1 flex flex-col justify-left gap-0'
              >
                <div className='text-lg'>
                  <span className='mr-2'>{pronouns[index][0]}</span>  
                  <span 
                    className={result[index] ? "red" : "w-[95px] inline-block  border rounded-md border-dotted"}
                    >
                    {result[index] ? result[index] : "..."}
                  </span>
                </div>
                <div>
                  <span className='text-[#9f50ac] mr-2'>{pronouns[index][1]}</span>
                  <span className='text-[#9f50ac]'>{answer[0]}</span>
                </div>                 
              </div>
            )
          })
          }) : conjugations.map((item, index) => {
            const arrayAnswers = Object.values(item)
            return arrayAnswers.map(answer => {
              return (
                <div 
                  key={index} 
                  className='text-white my-1 flex flex-col justify-left gap-0'
                >
                  <div className='text-lg'>
                    <span className='mr-2'>{pronouns[index][0]}</span>  
                    <span 
                      className={result[index] ? "" : "w-[95px] inline-block border rounded-md border-dotted"}
                      >
                      {result[index] ? result[index] : "..."}
                      <div className={evaluation[index] 
                        ? "bg-[url('/true.png')] h-[19px] w-[19px] bg-cover bg-center inline-block ml-2" 
                        : "bg-[url('/false.png')] h-[19px] w-[19px] bg-cover bg-center inline-block ml-2"}></div>
                    </span>
                  </div>
                  <div>
                    <span className='text-[#9f50ac] mr-2'>{pronouns[index][1]}</span>
                    <span className='text-[#9f50ac]'>{answer[0]}</span>
                  </div>   
                </div>
              )
            })
          })}
        <AnswersVerb 
          conjugations={conjugations}
          chosen={chosen}
          setChosen={setChosen}
          setCheckResults={setCheckResults}
        />

      </>
    )


  
}

export default InteractVerb



