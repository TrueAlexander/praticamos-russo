export const getBGColor = (userAnswer, correctAnswer, answer) => {
  const isAnswerCorrect = userAnswer ? userAnswer === correctAnswer : undefined

  if ((isAnswerCorrect === true && answer === userAnswer) || 
      (isAnswerCorrect === false && answer === correctAnswer)) {
    return 'bg-[#55ac78] text-white'
  }

  if (isAnswerCorrect === false && answer === userAnswer) {
    return 'bg-[#ac5050] text-white'
  }

  // теперь по умолчанию полностью белый фон
  return 'bg-white text-[#9f50ac]'
}


