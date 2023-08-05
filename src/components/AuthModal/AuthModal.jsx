'use client'
import Login from "../Login/Login"
import Register from "../Register/Register"
import { IoClose } from "react-icons/io5"
import "animate.css"
import Link from "next/navigation"
import { useEffect, useState } from "react"


const AuthModal = ({showModal, setShowModal, setIsLoading}) => {

  const [modeLogin, setModeLogin] = useState(true)

  return (
    <div 
      className={showModal ? "opacity-1 pointer-events-auto w-full h-full fixed top-0 left-0 bg-[#2b2737] show animate__animated animate__fadeInRight" : "opacity-0 pointer-events-none w-full h-full fixed top-0 left-0 bg-[#2b2737]"} 
      onClick={() => setShowModal(false)}
    >
      <div 
        className="absolute left-10 right-10 top-10 bottom-10 rounded-lg my-0 mx-auto max-w-[400px] border-2 border-[#9f50ac] scale-100 ease-in duration-1000 text-center flex flex-col justify-center items-center overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-white p-4 font-bold text-[18px] block">Prezado usuario!</h2>
        <button
          onClick={() => setShowModal(false)}
          className="text-white text-[22px] absolute right-3 top-3 scale-125"
        >  
          <IoClose/></button>
        <div className="">   
          {modeLogin 
          ? <Login setShowModal={setShowModal} setModeLogin={setModeLogin} setIsLoading={setIsLoading}/> 
          : <Register setShowModal={setShowModal} setModeLogin={setModeLogin} setIsLoading={setIsLoading}/>}
        </div>
      </div>
    </div>
  )
}

export default AuthModal