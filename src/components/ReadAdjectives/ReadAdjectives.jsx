import { CgPlayButtonO } from "react-icons/cg"
import { useState, useEffect } from 'react'

const ReadAdjectives = ({adjectives}) => {

  const handlePlay = (index) => {
    const audio = document.getElementById(`audio${index + 1}`)
    console.log(index)
    console.log(audio)
    audio.pause()
    audio.play()
  }
  const handlePlayAnt = (index) => {
    const audio = document.getElementById(`audio_ant${index + 1}`)
    console.log(index)
    console.log(audio)
    audio.pause()
    audio.play()
  }

  const [loading, setIsLoading] = useState(true)
  const [currentData, setCurrentData] = useState('')

  useEffect(() => {
    const generateData = () => Math.random() > 0.5 ? 'even' : 'odd'
    setCurrentData(generateData())
    setIsLoading(false)
  }, [])

  const evenAdjectives = adjectives.filter(adj => adj.id % 2 === 0)
  const oddAdjectives = adjectives.filter(adj => adj.id % 2 !==0)
 
  const dataArr = currentData === 'even' ? evenAdjectives : oddAdjectives

  return (
    loading ? <></> : <>
      <p className='text-[#9f50ac] mb-5'>escute e repita:</p>
      {dataArr.map((item, index) => {
        return (
          <div key={item.id} className='py-[3px] text-white text-[17px]'>
            <div>
              <h3 className='inline-block'>
                {/* //////////////////////////////////////////////////////// */}
                <div className='inline-block mr-2'>
                  <div 
                    htmlFor="audio"
                    onClick={() => handlePlay(index)}
                    className='ml-3 inline-block hover:text-[#a050ac] active:text-[#a050ac] text-lg'
                  >
                    <CgPlayButtonO />
                  </div>
                  <audio 
                    id={`audio${index + 1}`}
                    controls 
                    className="mx-auto hidden"
                  >
                    <source 
                      src={adjectives[item.id].audios.masc} 
                      type="audio/mpeg" 
                    />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
                {/* //////////////////////////////////////////////////////// */}
                {item.russian.masc}
              </h3>{" - "}  
              <h3 className='inline-block'>
                {item.antonyms_ru.masc}
                {/* //////////////////////////////////////////////////////// */}
                <div className='inline-block mr-2'>
                  <div 
                    htmlFor="audio"
                    onClick={() => handlePlayAnt(index)}
                    className='ml-3 inline-block hover:text-[#a050ac] active:text-[#a050ac] text-lg'
                  >
                    <CgPlayButtonO />
                  </div>
                  <audio 
                    id={`audio_ant${index + 1}`}
                    controls 
                    className="mx-auto hidden"
                  >
                    <source 
                      src={adjectives[item.id].audios_ant.masc} 
                      type="audio/mpeg" 
                    />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
                {/* //////////////////////////////////////////////////////// */}
              </h3>
            </div>
            <div className='text-[#9f50ac] text-[15px] '>
              <p className='inline-block'>{item.portuguese.masc}</p> - <p className='inline-block'>{item.antonyms_pt.masc}</p>
            </div>   
          </div>
        )
      })}
    </>
  )
}

export default ReadAdjectives