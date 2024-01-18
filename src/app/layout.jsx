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
    <html lang="en" style={{ height: '100%' }}>
      <body 
        // style={{ height: '100vh', position: "absolute", top: 0, left: 0, right: 0, display: "flex", flexDirection: "column", justifyItems:"center"  }} 
        // className="bg-[#2b2737] p-4 box-border flex flex-col h-dvh absolute top-0 bottom-0 left-0 right-0 justify-center overflow-hidden bodyClass"
        // className="bg-[#2b2737] box-border flex flex-col  justify-center 
        // overflow-hidden 
        // bodyClass"
        //className="bg-[#2b2737] h-svh px-2"
        className="bg-[#2b2737] h-full px-2"
        // className="bg-[#2b2737] p-4 box-border overflow-hidden bodyClass"
      >
        <AuthProvider>
          {/* <div className="w-fit mx-auto bg-slate-500"> */}
 
            {/* <main className={`${quicksand.variable} font-quicksand max-w-[900px] w-full m-auto flex flex-col items-center h-lvh justify-center overflow-hidden relative main bg-red-500`}> */}
            <main className={`${quicksand.variable} font-quicksand max-w-[380px] mx-auto flex flex-col relative justify-center items-center h-full`}>          
              <Link 
                href='/' 
                // className="max-h-[90px] mt-[65px] fixed top-0 logo"
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
              <div className="flex-grow flex items-center justify-center overflow-y-auto">
                {children} 
              </div>                   
              <p 
                // className='fixed bottom-0 text-white my-3 text-[10px] footer'
                className="text-white my-3 text-[10px]  text-center bg-slate-500 mx-auto left-0"
              >
                Suporte técnico por <a href="https://wa.me/5521967261434" target="_blank" >e-Formaliza</a>
              </p>
            </main>  
        </AuthProvider>   
      </body>
    </html>
  )
}



// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" style={{ height: '100%' }}>
//       <body className="bg-[#2b2737] h-full m-0 p-0">
//         <AuthProvider>
//           <main className={`${quicksand.variable} font-quicksand max-w-[380px] mx-auto flex flex-col h-full relative`}>
//             <Link href='/' className="" title="Voltar">
//               <div className="w-[90px] h-full cursor-pointer rounded-[50%] bg-gradient-radial from-[#dcddd8] to-[#9f50ac] border-4 border-[#9f50ac] mx-auto mt-[45px]">
//                 <Image className="" src={Logo} alt="logo" priority={false} />
//               </div>
//             </Link>
//             <div className="flex-grow flex flex-col items-center justify-center overflow-y-auto">
//               {children}
//             </div>
//             <p className="text-white my-3 text-[10px] fixed bottom-0 text-center bg-slate-500 mx-auto left-0">
//               Suporte técnico por <a href="https://wa.me/5521967261434" target="_blank">e-Formaliza</a>
//             </p>
//           </main>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }



// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-[#2b2737] h-svh px-2">
//         <AuthProvider>
//           <main className={`${quicksand.variable} font-quicksand max-w-[380px] mx-auto flex flex-col relative`}>
//             <Link href='/' className="" title="Voltar">
//               <div className="w-[90px] h-full cursor-pointer rounded-[50%] bg-gradient-radial from-[#dcddd8] to-[#9f50ac] border-4 border-[#9f50ac] mx-auto mt-[45px]">
//                 <Image className="" src={Logo} alt="logo" priority={false} />
//               </div>
//             </Link>
//             <div className="flex-grow flex items-center justify-center overflow-y-auto">
//               {children}
//             </div>
//             <p className="text-white my-3 text-[10px] fixed bottom-0 text-center bg-slate-500 mx-auto left-0">
//               Suporte técnico por <a href="https://wa.me/5521967261434" target="_blank">e-Formaliza</a>
//             </p>
//           </main>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
