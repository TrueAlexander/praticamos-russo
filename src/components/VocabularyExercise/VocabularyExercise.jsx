"use client"

import Image from "next/image"
import VocabularyCard from "../VocabularyCard/VocabularyCard"
import { useEffect, useState, useRef } from "react"
import Loading from "@/app/loading"
import { shuffleArray } from "@/utils/arrayUtils"


const VocabularyExercise = ({ question, currentQuestionIndex, answers }) => {

  const [audio, setAudio] = useState(question.audio)
  const audioRef = useRef()

  const [isLoading, setIsLoading] = useState(true)
  const [clickedAnswer, setClickedAnswer] = useState(null)

  const rightAnswer = question.name
  console.log(clickedAnswer, rightAnswer)
  
  useEffect(() => {
    setClickedAnswer(null)
  }, [currentQuestionIndex])

  useEffect(() => {
    setAudio(question.audio)
    if(audioRef.current) {
        audioRef.current.pause()
        audioRef.current.load()
        audioRef.current.play()
    }
    setIsLoading(false)
  }, [currentQuestionIndex])



  console.log("question: ", question)
  console.log("answers: ", answers)

 

  if (isLoading) {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else {
    return (
      <div 
        // className="flex min-h-screen flex-col items-center justify-between p-24"
      >
        <h3>Traduz o que você está ouvindo:</h3>
        <div>
          <audio ref={audioRef} controls className="mx-auto">
            <source src={audio} type="audio/ogg" />
            Your browser does not support the audio tag.
          </audio>
        </div>
        <div className="mt-6 flex flex-wrap gap-5 w-80 items-center justify-center">
          {answers.map((item) => (      
            <VocabularyCard
              item={item}
              key={item.title}
              clickedAnswer={clickedAnswer}
              setClickedAnswer={setClickedAnswer}
              rightAnswer={rightAnswer}
            />
          ))}
        </div>     
       </div>
    )
  }
}

export default VocabularyExercise
