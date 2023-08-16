import Spinner from '@/assets/spinner.gif'
import Image from "next/image"

const Loading = () => {
  return (
    <div>
       <Image 
          className="scale-75" 
          src={Spinner} 
          alt="loading"
        />
    </div>
)}

export default Loading
