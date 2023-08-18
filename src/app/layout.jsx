import Image from "next/image"
import { Quicksand } from 'next/font/google'
import Link from 'next/link'
import AuthProvider from "@/components/AuthProvider/AuthProvider"
//Logo
import Logo from '@/assets/logo.png'
import "./globals.css"

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand'
})

export const metadata = {
  title: 'Praticamos russo',
  description: 'Aprendemos russo. Praticamos russo. Vocabulário, verbos, casos!',
  themeColor: '#2b2737',
}

export default function RootLayout({children}) { 
  return (
    <html lang="en">
      <body className="bg-[#2b2737] p-4 h-screen absolute left-0 right-0 top-0 bottom-0 overflow-hidden box-border flex flex-col justify-center ">
        <AuthProvider>
          <div className="w-fit mx-auto">
            <main className={`${quicksand.variable} font-quicksand max-w-[900px] w-full h-full m-auto flex flex-col items-center justify-center h-screen overflow-hidden relative`}>         
              <Link href='/' className="max-h-[90px] mt-[65px] fixed top-0">
                <div className="w-[90px] h-full cursor-pointer rounded-[50%] bg-gradient-radial from-[#dcddd8] to-[#9f50ac] border-4 border-[#9f50ac]">
                  <Image 
                    className="" 
                    src={Logo} 
                    alt="logo"
                  />
                </div>     
              </Link>
              <div className="pt-[30px] bg-blue-500">
                {children} 
              </div>                   
              <p className='fixed bottom-0 text-white my-2 p-4 text-[10px] bg-yellow-500'>
                Criado por <a href="https://www.eformaliza.com/" target="_blank" >e-Formaliza</a>
              </p>
            </main>  
          </div>  
        </AuthProvider>   
      </body>
    </html>
  )
}