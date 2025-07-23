"use client"

import VocabularyCard from "../VocabularyCard/VocabularyCard"
import { useEffect, useState, useRef } from "react"
import Loading from "@/app/loading"

interface VocabularyExerciseProps {
  question: {
    audio: string
  }
  currentQuestionIndex: number
  answers: any[]
  rightAnswer: string
  setDisabled: (disabled: boolean) => void
}

const VocabularyExercise = ({ 
  question, 
  currentQuestionIndex, 
  answers, 
  rightAnswer, 
  setDisabled
 }:VocabularyExerciseProps) => {

  const [clickedAnswer, setClickedAnswer] = useState<string | null>(null)
  const [audioKey, setAudioKey] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  //to disable the button before the right answer
  useEffect(() => {
    setDisabled(clickedAnswer !== rightAnswer)
  }, [clickedAnswer, rightAnswer, setDisabled])

  //when move to the next question
  useEffect(() => {
    setClickedAnswer(null)
    setDisabled(true)
    setAudioKey(prev => prev + 1)
    setIsLoading(false)
  }, [currentQuestionIndex, setDisabled, question.audio])

  // Autoplay (only after new render of <audio>)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => {
        console.warn("Erro ao reproduzir áudio:", err)
      })
    }
  }, [audioKey])

  if (isLoading) {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else {
    return (
      <div>
        <h3>Traduza e repita o que você está ouvindo:</h3>
        <div>
          <audio
            key={audioKey} 
            ref={audioRef} 
            controls 
            className="mx-auto"
          >
            <source src={question.audio} type="audio/mpeg" />
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
