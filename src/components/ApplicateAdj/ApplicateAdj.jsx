import { CgPlayButtonO } from "react-icons/cg"
import { useState, useEffect } from 'react'
import Loading from "@/app/loading"
import PracticeApplicate from "../PracticeApplicate/PracticeApplicate"

const ApplicateAdj = ({adjectives}) => {


  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    loading ? 
    <div className="flex-auto flex flex-col justify-center">
      <Loading/> 
    </div> :   
    <PracticeApplicate adjectives={adjectives}/>
  )
}

export default ApplicateAdj