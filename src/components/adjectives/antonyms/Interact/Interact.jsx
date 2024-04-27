// import { CgPlayButtonO } from "react-icons/cg"
import { useState, useEffect } from 'react'
import Loading from "@/app/loading"
import Practice from "./Practice/Practice"

const Interact = ({adjectives}) => {


  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    loading ? 
    <div className="flex-auto flex flex-col justify-center">
      <Loading/> 
    </div> :   
    <Practice adjectives={adjectives}/>
  )
}

export default Interact