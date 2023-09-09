import Question from "@/models/Question"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const { category } = await request.json() 

  await connect()

  try {
    const res = await Question.find(
      { category: category }
    )
    return NextResponse.json({ questions: res }, { status: 201 })  
  } catch (error) { 
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}