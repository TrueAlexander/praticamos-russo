import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const PUT = async (request) => {

  const {email, category, result} = await request.json() 
  await connect()

  try {
    const dynamicKey = category
    const res = await User.findOneAndUpdate(
      { email: email }, 
      { $push: { results: {[dynamicKey]: result } }},
      { new: true } // Return the updated document
    )

    return new NextResponse("The information was added to DB", {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}