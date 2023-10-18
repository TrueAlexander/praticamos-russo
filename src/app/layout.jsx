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
      <body className="bg-[#2b2737] p-4     box-border flex flex-col h-screen ">
        <AuthProvider>
          <div className="w-fit mx-auto">
            <main className={`${quicksand.variable} font-quicksand max-w-[900px] w-full m-auto flex flex-col items-center justify-center  overflow-hidden relative`}>         
              <Link href='/' className="max-h-[90px] mt-[65px]  top-0 logo">
                <div className="w-[90px] h-full cursor-pointer rounded-[50%] bg-gradient-radial from-[#dcddd8] to-[#9f50ac] border-4 border-[#9f50ac]">
                  <Image 
                    className="" 
                    src={Logo} 
                    alt="logo"
                  />
                </div>     
              </Link>
              <div className="pt-[30px]">
                {children} 
              </div>                   
              <p className=' bottom-0 text-white my-3 text-[10px] footer'>
                Suporte técnico por <a href="https://www.eformaliza.com/" target="_blank" >e-Formaliza</a>
              </p>
            </main>  
          </div>  
        </AuthProvider>   
      </body>
    </html>
  )
}