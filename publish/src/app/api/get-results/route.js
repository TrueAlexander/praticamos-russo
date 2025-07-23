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
      /////percentage of right answers
      const resultObject = {}
      
      arrayAllRes.forEach(obj => {
        const [key, value] = Object.entries(obj)[0]
        if (!resultObject[key]) {
          resultObject[key] = { sum: 0, count: 0 }
        }
        resultObject[key].sum += value
        resultObject[key].count++
      })
      
      const resultArray = Object.keys(resultObject).map(key => ({[key]: resultObject[key].sum * 10 / resultObject[key].count }))
      /////
      //best results
      // const resultObject = {}
      // arrayAllRes.forEach(obj => {
      //   const [key, value] = Object.entries(obj)[0]
      //   if (!resultObject[key] || value > resultObject[key]) {
      //     resultObject[key] = value
      //   }
      // })
      
      // const resultArray = Object.entries(resultObject).map(([key, value]) => ({ [key]: value }))
      
      return NextResponse.json({ res: resultArray }, { status: 201 })
    }
    
  } catch (error) {
    console.log(error)
  }
}