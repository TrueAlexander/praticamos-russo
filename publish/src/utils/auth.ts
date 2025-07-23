import CredentialsProvider from "next-auth/providers/credentials"
import { type NextAuthOptions } from "next-auth"
import User from "@/models/User"
import connect from "@/utils/db"
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eformaliza@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
})

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text", placeholder: "seuemail@exemplo.com" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials: { email?: string; password?: string } | undefined) {
        
        if (!credentials?.email || !credentials?.password) {
        throw new Error(encodeURIComponent("E-mail e senha obrigatórios."))
        }

        await connect()

        try {
          const user = await User.findOne({ email: credentials?.email })

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials!.password,
              user.password
            )

            if (isPasswordCorrect) {
              if (user.emailVerified) {
                return user
              } else {
                const token = jwt.sign(
                  {
                    _id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                  },
                  process.env.JWT_KEY!,
                  { expiresIn: 60 * 60 }
                )

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
                      console.log('Verification email sent')
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
        } catch (err: any) {
          console.error("Erro no authorize:", err)
          throw new Error(err.message || "Erro desconhecido")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          isAdmin: user.isAdmin,
        }
      }
      return token
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          isAdmin: token.isAdmin,
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
