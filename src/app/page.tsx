import Image from 'next/image'
import ButtonStartWrapper from '@/components/globals/ButtonStartWrapper/ButtonStartWrapper'
import HomepageImage from '@/assets/home-pic.jpg'

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
