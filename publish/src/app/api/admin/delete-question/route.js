import Question from "@/models/Question"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const DELETE = async (request) => {

  const { _id }  = await request.json() 
  
  await connect()

  try {
    const question = await Question.findOne({_id})
    if(!question) {
      return NextResponse.json("Question does not exist", {
        status: 404,
    }) 
    } else {
      await Question.findByIdAndDelete(_id)    
      return NextResponse.json("Question was deleted", {
          status: 201,
      }) 
    }    
  } 
   
  catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}