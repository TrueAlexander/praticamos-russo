import Image from "next/image"
import { Quicksand } from 'next/font/google'
import Link from 'next/link'
import AuthProvider from "@/components/globals/AuthProvider/AuthProvider"
//Logo
import Logo from '@/assets/logo.png'
import "./globals.css"
import type { Metadata, Viewport } from "next"

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand'
})

export const metadata: Metadata = {
  title: 'Russolinguo | Praticamos russo',
  description: 'Russolinguo | Praticamos russo | Aprendemos russo | Vocabulário, verbos, casos...',
  openGraph: {
    title: 'Russolinguo | Praticamos russo',
    description: 'Russolinguo | Praticamos russo | Aprendemos russo | Vocabulário, verbos, casos...',
    url: 'https://russolinguo.com/',
    siteName: 'Russolinguo | Praticamos russo',
    images: ['https://i.ibb.co/Y33yVng/img-OGextra-Big.png'],
    type: 'website',
  },
}

export function generateViewport(): Viewport {
  return {
    themeColor: '#2b2737',
  }
}

// Props type
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) { 
  return (
    <html lang="en" style={{ height: 'calc(100% - 25px)' }}>
      <body
        className="bg-[#2b2737] h-full px-2"
      >
        <AuthProvider>
          <main className={`${quicksand.variable} font-quicksand max-w-[380px] mx-auto flex flex-col relative justify-center items-center h-full`}>          
            <Link 
              href="/" 
              title="Voltar"
              >
              <div 
                className="
                  w-[90px] h-[90px] mx-auto mt-[45px]
                  cursor-pointer rounded-full border-4 border-[#9f50ac]
                  bg-gradient-radial from-[#dcddd8]/50 to-[#9f50ac]/60
                  backdrop-blur-md
                  shadow-[inset_2px_2px_6px_rgba(255,255,255,0.2),_4px_4px_12px_rgba(0,0,0,0.3)]
                  transition-all duration-200 ease-in-out
                  hover:brightness-110 active:scale-95
                "
              >
                <Image 
                  className="w-full h-full object-cover rounded-full" 
                  src={Logo} 
                  alt="logo"
                  priority={false}
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