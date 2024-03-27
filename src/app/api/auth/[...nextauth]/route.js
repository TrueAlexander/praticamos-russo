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
                from: ' "RUSSOLINGUO" <eformaliza@gmail.com>',
                to: `${user.email}`,
                subject: `RUSSOLINGUO. ${user.name}, por favor, verifique seu e-mail!`,
                html: `
                <body style="background:#2b2737;">
                  <div style="font-family: arial;  font-size: 16px; text-align: center; color:white; background:#2b2737; padding: 30px 20px 80px;">
                    <h2>RUSSOLINGUO</h2>
                    <p style="font-size: 18px; line-height: 35px;">Prezado <span style="color:#9f50ac; font-size: 20px; font-weight: 600;">${user.name},</span> obrigado pelo cadastro no <a style="text-decoration:none; font-size: 20px; color: white; font-weight: bold;" href="${process.env.URL_BASE}">RUSSOLINGUO</a></p>
                    <p style="line-height: 25px;">Por favor, verifique seu e-mail para ativar seu perfil:</p>
                    <a style="color:#9f50ac; font-weight: 600;" href="${process.env.URL_BASE}/api/auth/verify-email?token=${token}">Clique aqui!</a>
                    <p style="font-size: 13px; margin-top: 30px; line-height: 18px;"> Caso você não seja ${user.name}, e não tenha se cadastrado no RUSSOLINGUO, por favor, ignore esta mensagem.
                    </p>
                  </div>
                </body>
                `}

              await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (err, info) => {
                  if (err) {
                    console.error(err)
                    reject(err)
                  } else {
                    resolve(info)
                    console.log('Verification email is sent to your email account')
                  }
                })
              })
              throw new Error(encodeURIComponent("Usuário não ativado! Por favor, verifique o seu e-mail."))     
              }
            } else {
              throw new Error(encodeURIComponent("E-mail e/ou senha incorretos!"))
            }
          } else {
            throw new Error(encodeURIComponent("Usuário não encontrado!"))
            
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
  callbacks: {
    jwt: async ({token, user, session}) => {
        //pass in user isAdmin to token
        if (user) {
          return {
            ...token,
            isAdmin: user.isAdmin,
          }
        }
        return token
    },
    session: async ({session, token, user}) => {
        //pass in user isAdmin to session
        return {
          ...session,
          user: {
            ...session.user,
            isAdmin: token.isAdmin,
          }
        }
    }
},
  secret: process.env.NEXTAUTH_SECRET,
  

})

export { handler as GET, handler as POST, handler as PUT }