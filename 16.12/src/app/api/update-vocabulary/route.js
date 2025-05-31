import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const PUT = async (request) => {

  const {email, category} = await request.json() 
  await connect()
  
  try {    
    const res = await User.findOne({ email: email })

    if (!res) {    
      return new NextResponse(error.message, {
        status: 500,
      })
    } else {
      if (res.vocabulary.length > 0) {
        const hasTargetElement = res.vocabulary.some(elem => {
          if (elem[category] === true) {
            return true
          } else return false
        })
        if (hasTargetElement) {
          console.log('User already finished this activity')
        } else {
          ////add a new element ex {comida: true}          
          const dynamicKey = category
          await res.updateOne(
            { $push: { vocabulary: {[dynamicKey]: true } }},
            { new: true } // Return the updated document
          )
        }
      } else {
        ////add a new element ex {comida: true}
          const dynamicKey = category
          await res.updateOne(
            { $push: { vocabulary: {[dynamicKey]: true } }},
            { new: true } // Return the updated document
          )
        }
      }
    return new NextResponse("The information was added to DB", {
      status: 201,
    })
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}