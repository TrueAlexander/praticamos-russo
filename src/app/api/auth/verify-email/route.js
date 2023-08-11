import connect from "@/utils/db"
import User from "@/models/User"
import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { redirect } from 'next/navigation'

export const GET = async (request) => {

  
  const {searchParams} = new URL(request.url)
  const token = searchParams.get("token")
  
  const decoded = jwt.verify(token, 'aleksandr')
  const email = decoded.email
  const _id = decoded._id

  await connect()

  try {
    const user = await User.findOneAndUpdate(
      {email: email, _id: _id}, {emailVerified: true}, { new:true }
    )
    
    if(!user) {
      return new NextResponse(error.message, {
        status: 401,
        message: "User not found"
      }) 
    } else {

    redirect('/')
      // return new NextResponse(message, {
      //   status: 201,
      //   message: "Email verified"
      // }) 
    }  
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    })
  }

  
  
  
  // const hashedPassword = await bcrypt.hash(password, 5)

  // const newUser = new User({
  //   name,
  //   email,
  //   password: hashedPassword,
  //   isAdmin: isAdmin,
  //   emailVerified: emailVerified
  // })

  // try {
  //   const user = await newUser.save()

  //   ///create token 
  //   const token = jwt.sign({
  //     _id: user._id,
  //     email: user.email,
  //     isAdmin: user.isAdmin
  //     },
  //   'aleksandr',
  //    {expiresIn: 60 * 60})

  //   ///
  //   const mailOptions = {
  //     from: ' "Praticamos russo" <eformaliza@gmail.com>',
  //     to: email,
  //     subject: `Praticamos Russo. ${name}, verifique seu email!`,
  //     html: `
  //     <h2>Prezado ${name}! Obrigado pelo cadastro no Praticamos russo!</h2>
  //     <h4>Por favor verifique seu email para ativar seu perfil</h4>
  //     <a href="http://verify?email=${email}">${token}</a>
  //     <h4> Se você não é ${name}, e não se cadastrou no Praticamos russo, por favor ignore esta mensagem.
  //     </h4>`}

  //   transporter.sendMail(mailOptions, function(error, info) {
  //     if (error) {
  //       console.log(error)
  //     } else {
  //       console.log('Verification email is sent to your email account')
  //     }
  //   })

  //   return new NextResponse("User has been created", {
  //     status: 201,
  //   })
    
  // } catch (error) {
   
  //   return new NextResponse(error.message, {
  //     status: 500,
  //   })
  // }
}
