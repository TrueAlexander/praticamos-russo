import { CgPlayButtonO } from "react-icons/cg"
import { useState, useEffect } from 'react'
import Loading from "@/app/loading"
import PracticeAnt from "../PracticeAnt/PracticeAnt"

const InteractAdjectives = ({adjectives}) => {


  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    loading ? 
    <div className="flex-auto flex flex-col justify-center">
      <Loading/> 
    </div> :   
    <PracticeAnt adjectives={adjectives}/>
  )
}

export default InteractAdjectives