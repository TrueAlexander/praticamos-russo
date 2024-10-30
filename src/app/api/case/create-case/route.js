import CasesBasic from "@/models/CasesBasic"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const caseData  = await request.json() 
 
  const newCase = new CasesBasic(caseData)
  
  await connect()

  try {
    const sameCase = await CasesBasic.find({question: newCase.question})

    console.log("same post:", sameCase)
    if (sameCase < 1) {
      await newCase.save()
      return NextResponse.json("Post has been created", {
        status: 201,
      }) 
    } else {
      return NextResponse.json("The same Post had been created before", {
        status: 400,
      }) 
    }

    // 
     
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}