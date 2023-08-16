import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import connect from "@/utils/db"
import bcrypt from "bcryptjs"
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

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await connect()

        try {
          const user = await User.findOne({
            email: credentials.email,
          })

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            )

            if (isPasswordCorrect) {
              /////
              if(user.emailVerified) {
                return user
              } else {
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
                to: `${user.email}`,
                subject: `Praticamos Russo. ${user.name}, verifique seu email!`,
                html: `
                <h2>Prezado ${user.name}! Obrigado pelo cadastro no Praticamos russo!</h2>
                <h4>Por favor verifique seu email para ativar seu perfil</h4>
                <a href="${process.env.URL_BASE}/api/auth/verify-email?token=${token}">Clique aqui!</a>
                <h4> Se você não é ${user.name}, e não se cadastrou no Praticamos russo, por favor ignore esta mensagem.
                </h4>`}

              transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error)
                } else {
                  console.log('Verification email is sent to your email account')
                }
              })
              throw new Error("O usuário não ativado! Confira por favor seu email")
              }
            } else {
              throw new Error("E-mail e/ou senha errados!")
            }
          } else {
            throw new Error("Usuário não encontrado!")
          }
        } catch (err) {
          throw new Error(err)
        }
      },
    }),
  ],
  pages: {
    error: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  

})

export { handler as GET, handler as POST, handler as PUT }