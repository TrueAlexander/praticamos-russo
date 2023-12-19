"use client"
import Image from 'next/image'
import { useState, useRef } from 'react'

const VocabularyCard = ({ item, clickedAnswer, setClickedAnswer, rightAnswer }) => {

  const divRef = useRef()

  const [addClass, setAddClass] = useState('border-[#9f50ac]')
  const [currentChosen, setCurrentChosen] = useState(null)

  const handleClick = (e) => {
    if(e.target === divRef.current || e.target.parentNode === divRef.current) {
      const currentValue = divRef.current.childNodes[0].innerHTML
      setCurrentChosen(currentValue)

      if(currentValue === clickedAnswer) {
        setClickedAnswer(null)
        setAddClass('border-[#9f50ac]')
      } else {
        setClickedAnswer(currentValue)
        if(currentValue === rightAnswer) {
          setAddClass('border-[#55ac78]')
        } else {
          setAddClass('border-[#ac5050]')
        }  
      }    
    }  
  }

  return (
    <div 
      className={`border-2 border-solid  ${currentChosen === clickedAnswer ?  addClass : 'border-[#9f50ac]'} w-28 h-28 rounded-lg flex flex-col items-center justify-center overflow-hidden cursor-pointer`}
      ref={divRef}
      onClick={(e) => handleClick(e)}
    >       
      <h3 
        onClick={(e) => handleClick(e)}
        >{item.alt}</h3>
      <h3 className='text-[#9f50ac] text-sm' 
      onClick={(e) => handleClick(e)}
      >{item.title}</h3>
      
      {/* <p className='text-xs'>{item.titleLat}</p> */}
      {/* <Image
        src={item.imgUrl}
        alt={item.alt}
        width={20}
        height={20}
      /> */}        
    </div>
  )
}

export default VocabularyCard
