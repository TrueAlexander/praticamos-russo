import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const { email } = await request.json() 

  await connect()

  try {

    const user = await User.findOne({email})

    if (user) {
      const arrayAllRes = user.results
      
      const resultObject = {}
      arrayAllRes.forEach(obj => {
        const [key, value] = Object.entries(obj)[0]
        if (!resultObject[key] || value > resultObject[key]) {
          resultObject[key] = value
        }
      })
      
      const resultArray = Object.entries(resultObject).map(([key, value]) => ({ [key]: value }))
      
      return NextResponse.json({ res: resultArray }, { status: 201 })
    }
    
  } catch (error) {
    console.log(error)
  }
}