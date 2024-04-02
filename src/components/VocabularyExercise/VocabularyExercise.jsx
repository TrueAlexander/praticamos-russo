"use client"

import Image from "next/image"
import VocabularyCard from "../VocabularyCard/VocabularyCard"
import { useEffect, useState, useRef } from "react"
import Loading from "@/app/loading"


const VocabularyExercise = ({ question, currentQuestionIndex, answers, rightAnswer, setDisabled }) => {

  const [audio, setAudio] = useState(question.audio)
  const audioRef = useRef()


  const [isLoading, setIsLoading] = useState(true)
  const [clickedAnswer, setClickedAnswer] = useState(null)

  useEffect(() => {
    if (clickedAnswer === rightAnswer) {
      setDisabled(false)
    } else setDisabled(true)
  }, [clickedAnswer])
  
  useEffect(() => {
    setClickedAnswer(null)
    setDisabled(true)
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
        <h3>Traduza e repita o que você está ouvindo:</h3>
        <div>
          <audio ref={audioRef} controls className="mx-auto">
            <source src={audio} type="audio/mpeg" />
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
              setDisabled={setDisabled}
            />
          ))}
        </div>     
       </div>
    )
  }
}

export default VocabularyExercise
