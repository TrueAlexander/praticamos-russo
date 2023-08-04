import { useState, useEffect } from 'react'
import Button from '../Button/Button'

const Login = ({setShowModal}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    //send email and password to server
    // try {
    //   const data = await dispatch(fetchAuth({email, password}))
    //   if (!data.payload) {
    //     alert("O login e/ou a senha estão errados!")
    //   } else {
    //     alert(data.payload.message)
    //     setShowModal(false)
    //     //send username and token to localstorage
    //     if (data.payload.userData) {
    //       localStorage.setItem("user", data.payload.userData.username)
    //       localStorage.setItem("token", data.payload.token)
    //     } else {
    //     ////send email verify
    //       dispatch(fetchVerify({email}))
    //     }
    //   }   
    // } catch (error) {
    //   console.log('error!!')
    // }     
  }
  
  return (
    <div className="login">
      <form 
        className="form" 
        onSubmit={handleSubmit}
      >
        <div className="form__input">
          <input 
            type="email" 
            name="email" 
            autoComplete="on"
            placeholder="email" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form__input">
          <input 
            type="password" 
            name="password"
            minLength={5}
            autoComplete="on" 
            placeholder="senha" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button 
          className="bg-[#9f50ac] select-none font-bold h-[32px] min-w-[100px] rounded-[10px] text-white mr-2 ml-2" 
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}

export default Login
