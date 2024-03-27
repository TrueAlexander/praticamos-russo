import React from 'react'
import Button from '../Button/Button'
import { CgPlayButtonO } from "react-icons/cg"

const ReadVerb = ({conjugations, pronouns, audios}) => {

  const handlePlay = (index) => {
    const audio = document.getElementById(`audio${index}`)
    audio.pause()
    audio.play()
  };

  return (
    <>
      <p className='text-[#9f50ac]'>leia as conjugações:</p>
      {conjugations.map((item, index) => {
        const arrayAnswers = Object.values(item)
        return arrayAnswers.map((answer) => {
          return (
            <div key={index} className='py-[3px]'>
              <h2 className='text-white text-[19px]'><span>{pronouns[index][0]}</span>  <span>{answer[1]}</span>
                <div className='inline-block'>
                  <div 
                    htmlFor="audio"
                    onClick={() => handlePlay(index + 1)}
                    className='ml-3 inline-block hover:text-[#a050ac]  active:text-[#a050ac] text-lg'
                  >
                    <CgPlayButtonO />
                  </div>
                  <audio 
                    id={`audio${index + 1}`}
                    controls 
                    className="mx-auto hidden"
                  >
                    <source 
                      src={audios[index]} 
                      type="audio/mpeg" 
                    />
                    Your browser does not support the audio tag.
                  </audio>
                </div>  
              </h2>  
              <p className='text-[#9f50ac]'><span>{pronouns[index][1]}</span>  <span>{answer[0]}</span></p>
            </div>
          )
        })
      })}
    </>
  )
}

export default ReadVerb