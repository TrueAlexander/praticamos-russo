const getQuestionsByCategory = async (category)=> {

  const endpointF = `${process.env.URL_BASE}/api/admin/${category}`

  const data = await (await fetch(endpointF, { cache: 'no-store'})).json()
  
  if (data) {
    return data
    // return data.map(question => ({
    //   ...question,
    //   answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    // })) 
  } else {
    return []
  }
  
}

export default getQuestionsByCategory