import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export const POST = async (request) => {

  const {email} = await request.json() 
  console.log(email)
  await connect()


  try {

    const user = await User.findOne({email})

    if(!user) {
      return new NextResponse("O usuario com este email nao foi encontrado, crie por favor um perfil", {
          status: 401,
        })
    } 

    ///get the password from DB
    
    ///send it to email
    // return user

    /////

    return new NextResponse("A senha foi enviada ao seu email!", {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}