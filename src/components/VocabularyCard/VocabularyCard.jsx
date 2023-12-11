"use client"
import Image from 'next/image'

const VocabularyCard = ({ item }) => {
  return (
    <div>
      <h2>Card</h2>      
      <div >
        <h3>{item.title}</h3>
        <p>{item.titleLat}</p>
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