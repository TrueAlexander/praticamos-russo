'use client'
import Login from "../Login/Login"
import Register from "../Register/Register"
import { FaRegWindowClose } from "react-icons/fa"
import "animate.css"
import Link from "next/navigation"


const AuthModal = ({showModal, setShowModal}) => {

  return (
    <div 
      className={showModal ? "opacity-1 pointer-events-auto w-full h-full fixed top-0 left-0 bg-[#2b2737] show animate__animated animate__fadeInRight" : "opacity-0 pointer-events-none w-full h-full fixed top-0 left-0 bg-[#2b2737]"} 
      onClick={() => setShowModal(false)}
    >
      <div 
        className="absolute left-10 right-10 top-20 bottom-20 pb-20 rounded-lg my-0 mx-auto max-w-[400px] border-2 border-[#9f50ac]  scale-100 ease-in duration-1000 text-center flex flex-col justify-center"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-white p-4 font-bold text-[18px]">Prezado usuario!</h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-white text-[22px] absolute right-3 top-3"
        >
          <FaRegWindowClose/></button>
        <div className="">   
            <h3 className="text-[#9f50ac] pt-4 pb-4 text-[15px] font-bold">Faz Login:</h3>
            <Login setShowModal={setShowModal} />
            <h3 className="text-[#9f50ac] pt-4 pb-2 text-[15px] font-bold">ou crie um perfil:</h3>
            <h3 className="text-white text-[15px] underline cursor-pointer">criar</h3>
            {/* <Register setShowModal={setShowModal} /> */}
        </div>
      </div>
    </div>
  )
}

export default AuthModal