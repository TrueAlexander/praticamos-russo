import Question from "@/models/Question"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  ////change to request query params!!

  const { category } = await request.json() 

  /////
  await connect()

  try {
    const res = await Question.find(
      { category: category }
    )

    console.log(res)

    return NextResponse.json({ questions: res }, { status: 201 })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}