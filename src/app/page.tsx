import Image from 'next/image'
import ButtonStartWrapper from '@/components/globals/ButtonStartWrapper/ButtonStartWrapper'
import HomepageImage from '@/assets/home-pic.jpg'

export const metadata = {
  title: "Russolinguo | Praticamos russo | Aprendemos russo",
  description: "Russolinguo | Praticamos russo | Aprendemos russo | Vocabulário, verbos, casos...",
  openGraph: {
    title: "Russolinguo | Praticamos russo | Aprendemos russo",
    description: "Russolinguo | Praticamos russo | Aprendemos russo | Vocabulário, verbos, casos...",
    url: "https://russolinguo.com/",
    siteName: "Russolinguo",
    type: "website",
    images: [
      {
        url: "https://i.ibb.co/Y33yVng/img-OGextra-Big.png'", 
        width: 1200,
        height: 630,
        alt: "Russolinguo homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://russolinguo.com/",
  },
}

export default function Home(): JSX.Element {
  return (
    <div className="text-center">
      <div className="">
        <p className='text-white p-4 font-bold uppercase tracking-widest text-[24px]'>Russolinguo</p>
        <Image className='max-w-[400px] w-[80%] mx-auto rounded-[10px]' src={HomepageImage} alt='home-page' priority={false} placeholder="blur"/>
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          Clique abaixo
        </p>
        <ButtonStartWrapper/>
      </div>           
    </div>
  )
}
