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
    ////1) find email in DB
    //if (!email) response "O usuario com este email nao foi encontrado, crie por favor um novo perfil"
    //if (OK): response "Para recuperar o acesso por favor confira seu email ${email}" 
    ///&& send an email with new link with token with offer to reset an old password and create a new one (create token, create new link with new route ../api/auth/request-change?email=email&token=token)
    ////2) after the user click and send new request to create-new-password:
    //get token from query. Check it.
    //if !token send your token is expired please request the recover de novo and redirect to AskRecover page
    ///if token is ok, redirect user to PassSend 
    //3) in PassSend compare 2 passwords, if not equals alert,
    ///else send new POST request to new route api/auth/new-password
    ///4) in new route receive email and password, findandupdate the user,
    //then redirect to login page

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
      <a href="http://localhost:3000/api/auth/request-change?token=${token}">Recuperar</a>
      <h4> Se você não é ${user.name}, e não se cadastrou no Praticamos russo, por favor ignore esta mensagem.
      </h4>`}

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email with request is sent to your email account')
      }
    })

    return new NextResponse(`Para recuperar o acesso por favor confira seu email: ${email}`, {
      status: 201,
    })
    
  } catch (error) {
   
    return new NextResponse(error.message, {
      status: 500,
    })
  }
}