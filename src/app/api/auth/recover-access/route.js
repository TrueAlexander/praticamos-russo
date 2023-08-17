import User from "@/models/User"
import connect from "@/utils/db"
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

  const {email} = await request.json() 

  await connect()

  try {
    const user = await User.findOne({email})

    if(!user) {
      return new NextResponse("O usuario com este email nao foi encontrado, crie por favor um perfil", {
          status: 401,
        })
    } 

    ///create token 
    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
      },
      process.env.JWT_KEY,
     {expiresIn: 60 * 60})

    const mailOptions = {
      from: ' "Praticamos russo" <eformaliza@gmail.com>',
      to: email,
      subject: 'Recuperação de acesso! Praticamos Russo.',
      html: `
      <h2>Prezado ${user.name}!</h2>
      <h4>Para recuperar o seu acesso a Praticamos russo, por favor clique em baixo: </h4>
      <a href="${process.env.URL_BASE}/api/auth/request-change?token=${token}">Recuperar</a>
      <h4> Se você não é ${user.name}, e não se cadastrou no Praticamos russo, por favor ignore esta mensagem.
      </h4>`}
    //

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(info)
          console.log('Email with request is sent to your email account')
        }
      })
    })

    //
    // transporter.sendMail(mailOptions, function(error, info) {
    //   if (error) {
    //     console.log(error)
    //   } else {
    //     console.log('Email with request is sent to your email account')
    //   }
    // })
    ///

    return new NextResponse(`Para recuperar o acesso por favor confira seu email: ${email}`, {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}