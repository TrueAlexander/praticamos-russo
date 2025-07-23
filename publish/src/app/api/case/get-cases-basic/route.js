import connect from "@/utils/db"
import CasesBasic from "@/models/CasesBasic"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const { caseBasic } = await request.json() 

  await connect()

  try {

    const data = await CasesBasic.find({case: caseBasic})

    if (data) {
      
      return NextResponse.json({ 
        res: data
       }, { status: 201 })
    }
    
  } catch (error) {
    console.log(error)
  }
}