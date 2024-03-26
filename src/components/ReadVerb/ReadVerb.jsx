import React from 'react'
import Button from '../Button/Button'

const ReadVerb = ({conjugations, pronouns}) => {
  return (
    <>
      <p className='text-[#9f50ac]'>leia as conjugações:</p>
      {conjugations.map((item, index) => {
        const arrayAnswers = Object.values(item)
        return arrayAnswers.map(answer => {
          return (
            <div key={index} className='py-[3px]'>
              <h2 className='text-white text-[19px]'><span>{pronouns[index][0]}</span>  <span>{answer[1]}</span></h2>
              <p className='text-[#9f50ac]'><span>{pronouns[index][1]}</span>  <span>{answer[0]}</span></p>
            </div>
          )
        })
      })}
    </>
  )
}

export default ReadVerb