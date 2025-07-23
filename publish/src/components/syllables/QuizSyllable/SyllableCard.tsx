'use client'
import { getBGColor } from "@/components/teste/QuestionCard/helpers/helpers"
import { CgPlayButtonO } from "react-icons/cg"
import { useRef, useEffect, useMemo } from "react"
import 'animate.css'
import { shuffleArray } from "@/utils/arrayUtils"

interface SyllableCardProps {
  currentExerciseIndex: number
  audioUrl: string
  options: string[]
  userAnswer?: string
  correctOption: string
  onClick: (answer: string, currentExerciseIndex: number) => void
}

const SyllableCard: React.FC<SyllableCardProps> = ({
  currentExerciseIndex,
  audioUrl,
  options,
  userAnswer,
  correctOption,
  onClick
}) => {

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const shuffledOptions = useMemo(() => shuffleArray(options), [options])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl
    }
  }, [audioUrl])

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(err => {
        console.warn("Erro ao reproduzir áudio:", err)
      })
    }
  }

  return (
    <div
      key={currentExerciseIndex} // força recriação ao trocar de pergunta
      className="flex-auto flex flex-col justify-center animate__animated animate__fadeIn"
    >
      <div className="animate__animated animate__pulse animate__infinite">
        <button
          onClick={handlePlay}
          className="inline-block hover:text-[#a050ac] active:text-[#a050ac] mt-5 mb-3 mx-auto scale-[2]"
        >
          <CgPlayButtonO />
        </button>
        <audio ref={audioRef} className="hidden">
          <source src={audioUrl} type="audio/m4a" />
        </audio>
      </div>

      <div className="flex flex-col items-center pt-3">
        {shuffledOptions.map(option => (
          <div
            key={option}
            onClick={() => onClick(option, currentExerciseIndex)}
            className={`
              ${getBGColor(userAnswer, correctOption, option)}
              cursor-pointer select-none font-bold text-center
              flex items-center justify-center
              h-[30px] w-[240px] max-w-[400px]
              px-3 my-2 rounded-[10px] overflow-hidden
              ${!userAnswer ? 'backdrop-blur-md' : ''}
              transition-all duration-200 ease-in-out
              shadow-[inset_2px_2px_6px_rgba(255,255,255,0.3),_3px_3px_10px_rgba(0,0,0,0.15)]
              hover:brightness-105 active:scale-95
            `}
          >
            <span className="truncate" dangerouslySetInnerHTML={{ __html: option }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SyllableCard
