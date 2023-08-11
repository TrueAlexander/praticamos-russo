import User from "@/models/User"
import connect from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import nodemailer from "nodemailer"


//mail sender details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eformaliza@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
})

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

    ///test nodemailer

    const mailOptions = {
      from: ' "Praticamos russo" <eformaliza@gmail.com>',
      to: email,
      subject: 'Praticamos Russo. Verifique seu email!',
      html: `
      <h2>Prezado usuario! Obrigado pelo cadastro no Praticamos russo!</h2>
      <h4>Por favor verifique seu email para ativar seu perfil...</h4>
      <a href="http://auth/verify?email=${email}">Clique aqui!</a>`}

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Verification email is sent to your email account')
      }
    })

    ///test nodemailer

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