"use client"

import { useState, useRef, MouseEvent } from 'react'

interface VocabularyCardProps {
  item: {
    title: string
    alt: string
  }
  clickedAnswer: string | null
  setClickedAnswer: (answer: string | null) => void
  rightAnswer: string
  setDisabled: (disabled: boolean) => void
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ item, clickedAnswer, setClickedAnswer, rightAnswer, setDisabled  }) => {

  const divRef = useRef<HTMLDivElement | null>(null)

  const [addClass, setAddClass] = useState<string>('border-[#9f50ac]')
  const [currentChosen, setCurrentChosen] = useState<string | null>(null)

  const handleClick = (e: MouseEvent) => {
    if (!divRef.current) return

    if(e.target === divRef.current || (e.target instanceof HTMLElement && e.target.parentElement === divRef.current)) {
      const currentValue = divRef.current.querySelector('h3')?.innerHTML ?? ''
      setCurrentChosen(currentValue)

      if(currentValue === clickedAnswer) {
        setClickedAnswer(null)
        setAddClass('border-[#9f50ac]')
      } else {
        setClickedAnswer(currentValue)
        if(currentValue === rightAnswer) {
          setAddClass('border-[#55ac78] bg-[#87cfa40f]')
          setDisabled(false)
        } else {
          setAddClass('border-[#ac5050] bg-[#ac50501d]')
        }  
      }    
    }  
  }
  return (
    <div 
      className={`border-2 border-solid  ${currentChosen === clickedAnswer ?  addClass : 'border-[#9f50ac]'} w-28 h-28 rounded-lg flex flex-col items-center justify-center overflow-hidden cursor-pointer`}
      ref={divRef}
      onClick={handleClick}
    >       
      <h3 onClick={handleClick}>{item.alt}</h3>
      <h3 className='text-[#9f50ac] text-sm' onClick={handleClick}>{item.title}</h3>
    </div>
  )
}

export default VocabularyCard
