"use client"
import Image from 'next/image'
import { useState } from 'react'

const VocabularyCard = ({ item }) => {

  const [addStyle, setAddStyle] = useState('')

  const handleCardClick = (e) => {
    console.dir(e.target.innerHTML)
  }

  // () => setAddStyle('border-[#55ac78]')

  return (
    <div 
      className={`border-2 border-solid border-[#9f50ac] w-28 h-28 rounded-lg flex flex-col items-center justify-center overflow-hidden cursor-pointer ${addStyle}`}
      onClick={handleCardClick}
    >     
      <div >
        <h3>{item.alt}</h3>
        <h3 className='text-[#9f50ac] text-sm'>{item.title}</h3>
        
        {/* <p className='text-xs'>{item.titleLat}</p> */}
        {/* <Image
          src={item.imgUrl}
          alt={item.alt}
          width={20}
          height={20}
        /> */}
      </div>    
    </div>
  )
}

export default VocabularyCard