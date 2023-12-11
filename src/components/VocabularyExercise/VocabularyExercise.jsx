"use client"

import Image from "next/image"
import VocabularyCard from "../VocabularyCard/VocabularyCard"
import { useEffect, useState, useRef } from "react"
import Loading from "@/app/loading"

const VocabularyExercise = ({ question, onClick, currentQuestionIndex }) => {

  const [audio, setAudio] = useState(question.audio)
  const audioRef = useRef()

  const [isLoading, setIsLoading] = useState(true)

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
      <h3>Traduz o que você está ouvindo:</h3>
      <div>
        {/* <Image 
          src=""
          alt="assistent"
          width={30}
          height={30}
        /> */}
      </div>
      <div>
        <audio ref={audioRef} controls>
          <source src={audio} type="audio/ogg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
      {question.cards.map((item, number) => (      
        <VocabularyCard
          item={item}
          key={number}
        />
      ))}
      
    </div>
    )
  }
}

export default VocabularyExercise
