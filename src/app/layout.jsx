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
  title: 'Russolinguo | Praticamos russo',
  description: 'Russolinguo | Praticamos russo | Aprendemos russo | Vocabulário, verbos, casos...',
  themeColor: '#2b2737',
  openGraph: {
    title: 'Russolinguo | Praticamos russo',
    description: 'Russolinguo | Praticamos russo | Aprendemos russo | Vocabulário, verbos, casos...',
    url: 'https://russolinguo.com/',
    siteName: 'Russolinguo | Praticamos russo',
    images: 'https://i.ibb.co/Y33yVng/img-OGextra-Big.png',
    type: 'website',
  },
  
}

export default function RootLayout({children}) { 
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
                    priority={false}
                    // // placeholder="blur"
                  />
                </div>     
              </Link>
              <div className="pt-[30px]">
                {children} 
              </div>                   
              <p className='fixed bottom-0 text-white my-3 text-[10px] footer'>
                Suporte técnico por <a href="https://wa.me/5521967261434" target="_blank" >e-Formaliza</a>
              </p>
            </main>  
          </div>  
        </AuthProvider>   
      </body>
    </html>
  )
}