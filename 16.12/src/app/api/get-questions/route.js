import Question from "@/models/Question"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const { category } = await request.json() 
  await connect()

  try {
    const questionsArray = await Question.find({category: category})

    if (questionsArray.length > 0) { 
      return NextResponse.json({ res: questionsArray }, { status: 201 })
    }
    
  } catch (error) {
    console.log(error)
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}