import Spinner from '@/assets/spinner.gif'
import Image from "next/image"

const Loading = () => {
  return (
    <div>
       <Image 
          className="scale-50 mx-auto" 
          src={Spinner} 
          alt="loading"
        />
    </div>
)}

export default Loading
