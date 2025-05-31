import { CgPlayButtonO } from "react-icons/cg"
import { useEffect, useState } from "react"
import Button from "@/components/globals/Button/Button"

const Card = ({adjective, setAnswer, setShowModal}) => {
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setAnswer(e.target[0].value.toLowerCase())
    setShowModal(true)
  }

  useEffect(() => {
    document.querySelector(".input").value = ""
  }, [adjective])

  return (
    <div className='py-[3px] text-white text-[20px]'>
      <p className='text-[#9f50ac] text-[15px] mb-3'>traduza a frase abaixo</p>
      <h3 className="inline-block">
        {adjective.exp_pt}
      </h3>
      <p className='text-[#9f50ac]  text-[15px] my-3'>digite o adjetivo apropriado:</p>
      <form 
        className="form" 
        onSubmit={handleSubmit}
      >
        <input 
          type="text"
          required
          autoComplete="off"
          placeholder="....."  
          className={`input placeholder-font inline-block text-center bg-inherit text-[18px] w-[140px] border border-solid border-[#9f50ac] text-white rounded-md px-2 focus:ring-white focus:placeholder-transparent focus:text-white       
          `}
          onChange={(e) => setAnswer(e.target.innerText)}
        />
        <h3 className="inline-block ml-3">
          {adjective.noun_ru}
        </h3>
        <div className="flex justify-center mt-6">
          <Button
            addStyle="text-[14px]"
            disabled={false}
            text="Conferir"
            type="submit"
            title='Conferir'
          />
        </div>
      </form> 
    </div>     
  )
}

export default Card