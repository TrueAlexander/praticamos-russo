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

  // let layoutClass

  // const layoutFull = () => {
  //   if (window.orientation === 90 || window.orientation === -90) {
  //     // The device is in landscape orientation
  //     console.log("Device is in landscape orientation.")
  //     return ""
  //   } else {
  //     // The device is not in landscape orientation
  //     console.log("Device is not in landscape orientation.")
  //     return "h-screen"
  //   }
  // }
  
  // const layoutFull = "h-screen"

  // if (
  //   //max-width: 916px
  //   //orientation: landscape
  // ) {
  //   return layoutFull
  // } else {
  //   return ""
  // }

  return (
    <html lang="en">
      <body className="bg-[#2b2737] p-4 box-border flex flex-col h-screen absolute top-0 bottom-0 left-0 right-0 justify-center overflow-hidden bodyClass">
        <AuthProvider>
          <div className="w-fit mx-auto">
            <main className={`${quicksand.variable} font-quicksand max-w-[900px] w-full m-auto flex flex-col items-center h-screen justify-center overflow-hidden relative main`}>         
              <Link href='/' className="max-h-[90px] mt-[65px] fixed top-0 logo">
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
              <p className='fixed bottom-0 text-white my-3 text-[10px] footer'>
                Suporte técnico por <a href="https://www.eformaliza.com/" target="_blank" >e-Formaliza</a>
              </p>
            </main>  
          </div>  
        </AuthProvider>   
      </body>
    </html>
  )
}