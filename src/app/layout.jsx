'use client'
import Image from "next/image"
import { Quicksand } from 'next/font/google'
import Link from 'next/link'
import { useState } from "react"
//Logo
import Logo from '@/assets/logo.png'
import "./globals.css"
///Components
import AuthModal from "@/components/AuthModal/AuthModal"
import ButtonAuth from "@/components/ButtonAuth/ButtonAuth"

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand'
})

export const metadata = {
  title: 'Praticamos russo',
  description: 'Aprendemos russo. Praticamos russo. Vocabulário, verbos, casos!',
}

export default function RootLayout({children}) {

  const [showModal, setShowModal] = useState(false)

  return (
    <html lang="en">
      <body className="bg-[#2b2737] p-4 h-screen absolute left-0 right-0 top-0 bottom-0 overflow-hidden box-border flex flex-col justify-center ">
        <main className={`${quicksand.variable} font-quicksand max-w-[900px] w-full m-auto flex flex-col items-center justify-center h-screen overflow-hidden `}>
          <ButtonAuth setShowModal={setShowModal}/>
          <Link href='/' className="max-h-[90px] shrink">
            <div className="w-[90px] h-full cursor-pointer  rounded-[50%] bg-gradient-radial from-[#dcddd8]  to-[#9f50ac] border-4 border-[#9f50ac]">
              <Image 
                className="" 
                src={Logo} 
                alt="logo"
              />
            </div>     
          </Link>
          {children}
          {showModal && <AuthModal showModal={showModal} setShowModal={setShowModal}/>}
          <p className='text-white mt-5 p-4 text-[10px]'>
            Criado por <a href="https://www.eformaliza.com/" target="_blank" >e-Formaliza</a>
          </p>
        </main>        
      </body>
    </html>
  )
}