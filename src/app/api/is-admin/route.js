import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {

  const { email, name } = await request.json() 

  await connect()

  try {

    const user = await User.findOne({email, name})

    if (user) {
      const isAdmin = user.isAdmin
      console.log(isAdmin)
      return NextResponse.json({ isAdmin: isAdmin }, { status: 201 })
    }
    
  } catch (error) {
    console.log(error)
  }
}