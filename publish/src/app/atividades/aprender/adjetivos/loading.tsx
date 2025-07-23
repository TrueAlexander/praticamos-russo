import spinner from '@/assets/spinner.gif'

const Loading = (): JSX.Element => {
  return (
    <div>
       <img 
          className="scale-50 mx-auto" 
          src={spinner.src} 
          alt="loading"
          width={200}
          height={200}
        />
    </div>
)}

export default Loading
