import React from 'react'

const Register = ({setShowModal, setModeLogin}) => {
  return (
    <div className="my-7 animate__animated animate__fadeIn">
      <h3 className="text-[#9f50ac] pb-4 text-[15px] font-bold">Crie um novo Usuário:</h3>
      <form 
        className="form" 
        // onSubmit={handleSubmit}
      >
        <div className="mt-5">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md w-3/4 text-[18px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="text" 
            name="name" 
            autoComplete="on"
            placeholder="nome" 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="my-7">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md w-3/4 text-[18px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
            type="email" 
            name="email" 
            autoComplete="on"
            placeholder="email" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-9">
          <input
            className='px-3 py-1 bg-transparent text-white rounded-md w-3/4 text-[18px] placeholder:text-white border border-white shadow-sm focus:outline-none focus:border-none focus:ring-[#9f50ac] focus:outline-[#9f50ac] focus:placeholder-transparent'
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
          className="bg-[#9f50ac] select-none font-bold h-[30px] min-w-[100px] rounded-[10px] text-white mr-2 ml-2" 
          type="submit"
          title='Fazer cadastro'
        >
          Enviar
        </button>
      </form>
      <h3 className="text-[#9f50ac] pt-6 pb-2 text-[15px] font-bold">ou identifique-se:</h3>
        <button 
          title="Criar Usuário" 
          className="text-white text-[15px] underline cursor-pointer"
          onClick={() => setModeLogin(true)}
        >
          fazer login
        </button>
    </div>
  )
}

export default Register
