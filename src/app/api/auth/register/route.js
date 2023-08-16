import User from "@/models/User"
import connect from "@/utils/db"
import bcrypt from 'bcryptjs'
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

//mail sender details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eformaliza@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
})

export const POST = async (request) => {

  const {name, email, password, isAdmin, emailVerified} = await request.json() 

  await connect()

  const hashedPassword = await bcrypt.hash(password, 5)

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: isAdmin,
    emailVerified: emailVerified
  })

  try {
    const user = await newUser.save()

    ///create token 
    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
      },
      process.env.JWT_KEY,
     {expiresIn: 60 * 60})

    ///
    const mailOptions = {
      from: ' "Praticamos russo" <eformaliza@gmail.com>',
      to: email,
      subject: `Praticamos Russo. ${name}, verifique seu email!`,
      html: `
      <h2>Prezado ${name}! Obrigado pelo cadastro no Praticamos russo!</h2>
      <h4>Por favor verifique seu email para ativar seu perfil</h4>
      <a href="${process.env.URL_BASE}/api/auth/verify-email?token=${token}">Clique aqui!</a>
      <h4> Se você não é ${name}, e não se cadastrou no Praticamos russo, por favor ignore esta mensagem.
      </h4>`}

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Verification email is sent to your email account')
      }
    })

    return new NextResponse("User has been created", {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}
