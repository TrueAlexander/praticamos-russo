import Question from "@/models/Question"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const {
    category,
    question,
    correct_answer,
    answers,
    incorrect_answers}  = await request.json() 
 
  const newQuestion = new Question({
    category,
    question,
    correct_answer,
    answers,
    incorrect_answers
  })
  
  await connect()

  try {
    const sameQuestion = await Question.find({question: question})

    console.log("same question:", sameQuestion)
    if (sameQuestion < 1) {
      const question = await newQuestion.save()
      return NextResponse.json("Question has been created", {
        status: 201,
      }) 
    } else {
      return NextResponse.json("The same question had been created before", {
        status: 400,
      }) 
    }

    // 
     
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}