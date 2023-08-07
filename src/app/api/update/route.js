import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const PUT = async (request) => {

  const {email, category, result} = await request.json() 
  // console.log(category)
  await connect()


  try {

    // await User.findOneAndUpdate({ email: email }, {
    //   "$set": {
    //   results: [{category: currentResult}],
    // }})
    const dynamicKey = category
    const res = await User.findOneAndUpdate(
      { email: email }, // Find user with this email
      { $push: { results: {[dynamicKey]: result } }},
       // Update the results 
      { new: true } // Return the updated document
    )
    

    /////

    return new NextResponse("The information was added to DB", {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}