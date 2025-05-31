
import Image from "next/image"

const Loading = (): JSX.Element => {
  return (
    <div>
       <Image 
          className="scale-50 mx-auto" 
          src="/spinner.gif" 
          alt="loading"
          width={200}
          height={200}
        />
    </div>
)}

export default Loading
