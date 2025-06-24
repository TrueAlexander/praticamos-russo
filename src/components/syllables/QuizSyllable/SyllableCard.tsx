//helpers
import { getBGColor} from "@/components/teste/QuestionCard/helpers/helpers"
import { CgPlayButtonO } from "react-icons/cg"

const SyllableCard = ({ currentExerciseIndex, exercise, options, userAnswer, correctOption, onClick}) => {

  return (
  <div className="flex-auto flex flex-col justify-center">
    {/* <p className="text-[18px] mt-1 max-w-[400px]" dangerouslySetInnerHTML={{__html: exercise}}>
  
    </p> */}
    <div>
      <button 
      // htmlFor="audio"
      // onClick={() => handlePlay(index + 1)}
      className=' inline-block hover:text-[#a050ac]  active:text-[#a050ac] mt-5 mb-3 mx-auto scale-[2]'
    >
      <CgPlayButtonO />
    </button>
     <audio 
        // id={`audio${index + 1}`}
        controls 
        className="mx-auto hidden"
      >
        <source 
          src={exercise.audioUrl} 
          type="audio/mpeg" 
        />
        Your browser does not support the audio tag.
      </audio>
    </div>    
    <div className="flex flex-col items-center pt-3">
      {options.map(option => (
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
)}

export default SyllableCard