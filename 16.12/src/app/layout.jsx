import Image from "next/image"
import { Quicksand } from 'next/font/google'
import Link from 'next/link'
import AuthProvider from "@/components/globals/AuthProvider/AuthProvider"
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
    <html lang="en" style={{ height: 'calc(100% - 25px)' }}>
      <body
        className="bg-[#2b2737] h-full px-2"
      >
        <AuthProvider>
          <main className={`${quicksand.variable} font-quicksand max-w-[380px] mx-auto flex flex-col relative justify-center items-center h-full`}>          
            <Link 
              href='/' 
              className=""
              title="Voltar"
            >
              <div 
                className="w-[90px] h-[90px] cursor-pointer rounded-[50%] bg-gradient-radial from-[#dcddd8] to-[#9f50ac] border-4 border-[#9f50ac] mx-auto mt-[45px]"
              >
                <Image 
                  className="" 
                  src={Logo} 
                  alt="logo"
                  priority={false}
                  // placeholder="blur"
                />
              </div>    
            </Link>
            <div className="flex-grow flex items-center justify-center overflow-y-auto children pb-4">
              {children} 
            </div>                   
            <p 
              className="text-white mb-3 mt-1 text-[10px] -translate-x-1/2  fixed bottom-0 mx-auto left-1/2"
            >
              <a href="https://wa.me/5583993307656" target="_blank" title="Clique se precisar de ajuda">Fale conosco</a>
            </p>
          </main>  
        </AuthProvider>   
      </body>
    </html>
  )
}