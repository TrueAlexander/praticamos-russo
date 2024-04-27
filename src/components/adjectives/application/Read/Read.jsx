// import Button from '../Button/Button'
import { CgPlayButtonO } from "react-icons/cg"
// import Practice from "../Interact/Practice/Practice"

const Read = ({adjectives}) => {

  const handlePlay = (index) => {
    
    const audio = document.getElementById(`audio${index}`)
    audio.pause()
    audio.play()
  }

  return (
    <>
      <p className='text-[#9f50ac] mb-5'>escute e repita as expressões:</p>
      {adjectives.map((item, index) => {
          return (
            <div key={index} className='py-[3px]'>
              <h2 className='text-white text-[19px]'><span>{item.exp_ru}</span>
                <div className='inline-block'>
                  <div 
                    htmlFor="audio"
                    onClick={() => handlePlay(index + 1)}
                    className='ml-3 inline-block hover:text-[#a050ac]  active:text-[#a050ac] text-lg'
                  >
                    <CgPlayButtonO />
                  </div>
                  <audio 
                    id={`audio${index + 1}`}
                    controls 
                    className="mx-auto hidden"
                  >
                    <source 
                      src={item.audio} 
                      type="audio/mpeg" 
                    />
                    Your browser does not support the audio tag.
                  </audio>
                </div>  
              </h2>  
              <p className='text-[#9f50ac]'><span>{item.exp_pt}</span></p>
            </div>
          )
        })
      }
    </>
  )
}

export default Read