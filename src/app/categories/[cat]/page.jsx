//utils
import { shuffleArray } from "@/utils/arrayUtils"

//Components
import Quiz from "../../../components/Quiz/Quiz"

const TOTAL_QUESTIONS = 10

// const getQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState> => {
//   const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`

//   const data: {results: Array<Question> } = await (await fetch(endpoint, { cache: 'no-store'})).json()

//   return data.results.map(question => ({
//     ...question,
//     answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
//   }))
// }

//////

const getQuestionsFirebase = async (category)=> {
  const endpointF = `https://exercises-russian-lang-default-rtdb.firebaseio.com/${category}.json`
  const dataFirebase = await (await fetch(endpointF, { cache: 'no-store'})).json()
  
  if (dataFirebase) {
    return dataFirebase.map(question => ({
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    })) 
  } else {
    return []
  }
  
}



const QuizPage = async ({params}) => {
  const category = params.cat

  const newQuestions = await getQuestionsFirebase(category)
  const shuffledNewQuestions = shuffleArray(newQuestions)
  
  // const questions = await getQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
  if (shuffledNewQuestions.length > 0) {
    return ( 
      <Quiz questions={shuffledNewQuestions} totalQuestions={TOTAL_QUESTIONS} category={category}/>
    )
  } else {
    return (
      <div className='text-center flex flex-col justify-center'>     
          <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não existe!</p>    
      </div>
    )
  }
 
}

export default QuizPage