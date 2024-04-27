import "animate.css"

const ModalFromTop = ({showModal, setShowModal, children}) => {

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div 
      className={showModal ? "opacity-1 z-50 pointer-events-auto w-full h-full fixed top-0 left-0 bg-[#2b2737] show animate__animated animate__fadeInDown" : "opacity-0 pointer-events-none w-full h-full fixed top-0 left-0 bg-[#2b2737]"} 
      onClick={ handleClose }
    >   
      <div 
        className="absolute left-10 right-10 top-10 bottom-10 rounded-lg my-0 mx-auto max-w-[400px] border-2 border-[#9f50ac] scale-100 ease-in duration-1000 text-center flex flex-col justify-center items-center overflow-hidden modalContent"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default ModalFromTop