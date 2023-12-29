import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const { email } = await request.json() 

  await connect()

  try {

    const user = await User.findOne({email})

    if (user) {
      const vocabulary = user.vocabulary
      const keysVocabulary = vocabulary.flatMap(obj => Object.keys(obj))
      
      return NextResponse.json({ 
        res: keysVocabulary
       }, { status: 201 })
    }
    
  } catch (error) {
    console.log(error)
  }
}