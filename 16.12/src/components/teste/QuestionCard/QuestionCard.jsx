//helpers
import { getBGColor } from "./helpers/helpers"

const QuestionCard = ({ currentQuestionIndex, question, answers, userAnswer, correctAnswer, onClick}) => {

  return (
  <div className="flex-auto flex flex-col justify-center">
    <p className="text-[18px] mt-1 max-w-[400px]" dangerouslySetInnerHTML={{__html: question}}></p>
    <div className="flex flex-col items-center pt-3">
      {answers.map(answer => (
        <div
          key={answer}
          onClick={() => onClick(answer, currentQuestionIndex)}
          className={`${getBGColor(userAnswer, correctAnswer, answer)} cursor-pointer flex items-center justify-center select-none font-bold h-[30px] max-w-[400px]  w-[240px]  px-3 my-2 rounded-[10px] overflow-hidden`}
        >
          <span className="truncate" dangerouslySetInnerHTML={{__html: answer}} />
        </div>
      ))}
    </div>
  </div>
)}

export default QuestionCard