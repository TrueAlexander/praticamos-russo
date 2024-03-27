import { useEffect, useState } from 'react'
import Button from '../Button/Button'

const AnswersVerb = ({conjugations, setChosen, setCheckResults}) => {

  const [array, setArray] = useState(conjugations)
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [countClick, setCountClick] = useState(0)

  const newAnswersArray = []
  conjugations.map((el) => newAnswersArray.push(Object.values(el)))

  const toRender = newAnswersArray.sort(() => Math.random() - 0.5)

  useEffect(() => {
    setArray(toRender)
  }, [])

  const clickChoose = (e) => {
    e.target.classList.add('hidden')
    setChosen(prev => prev + " " + e.target.innerText)
    setCountClick(prev => prev + 1)
  }

  const clickResult = () => {
    setCheckResults(true)
    setBtnDisabled(true)
  }
  
  return (
    <div 
      className={countClick < conjugations.length ? "flex h-[70px] w-[300px] mt-2 border flex-wrap text-white text-sm p-1 bg-[#a050ac4e] rounded-md" : ""}
    >
      {countClick < conjugations.length ? array.map((item, ind) => {
        const arrayAnswers = Object.values(item)
        return arrayAnswers.map(answer => {
          return (
          <span
            className='inline-block border border-dotted h-min px-1 rounded-md w-min mb-1 mr-1 ml-1 cursor-pointer justify-start'
            onClick={clickChoose} 
            key={ind}>
              {answer[1]}
            </span>
          )
      })})
      : <div className='h-[70px] w-[300px] flex flex-col items-center justify-center'>
          <Button
            text="Conferir"
            disabled={btnDisabled}
            addStyle="h-min text-sm"
            onClick={clickResult}
          />
        </div>}
    </div>
  )
}

export default AnswersVerb