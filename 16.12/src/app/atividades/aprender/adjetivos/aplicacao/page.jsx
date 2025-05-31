'use client'
//utils
import { shuffleArray } from "@/utils/arrayUtils"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useEffect, useState } from "react"
import { useSession, signOut } from 'next-auth/react' 
import dataAdjectives from '../../../../../../dataAppAdjectives.json'
//Components
import Loading from "../loading"
import Button from "@/components/globals/Button/Button"
import { useRouter } from "next/navigation"
import Interact from "@/components/adjectives/application/Interact/Interact"
import Read from "@/components/adjectives/application/Read/Read"




const Aplicacao = () => {
  
  const router = useRouter()
  const session = useSession()
  const name = session.data?.user?.name || null

  const [interact, setInteract] = useState(false)

  const handleClickReturn = () => {
    confirmAlert({
      message: `${name}, tem certeza de que deseja sair da atividade?`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => router.push("/atividades/aprender/adjetivos")  
        },
        {
          label: 'Não',
          // onClick: () => console.log('Click No')
        }
      ]
    })
  }

  const handleInteract = () => {
    if (interact === true) {
      confirmAlert({
        message: `${name}, tem certeza de que deseja sair da atividade?`,
        buttons: [
          {
            label: 'Sim',
            onClick: () => setInteract(!interact)  
          },
          {
            label: 'Não',
            // onClick: () => console.log('Click No')
          }
        ]
      })
    } else setInteract(!interact)
  }

  if (session.status === "loading") {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (session.status === "authenticated") {
    return ( 
      <div className={`fixed z-[10000] top-0 bottom-0 overflow-y-auto bg-[#2b2737] text-center flex flex-col ${interact ? "justify-center py-0" :  "justify-left py-6"}`} >
          <button 
            className="text-white tracking-wider active:scale-95  h-[23px] min-w-[90px] rounded-[10px] bg-[#9f50ac] fixed top-1/2 transform -translate-y-1/2 right-0 lg:mr-[345px] md:mr-[200px] rotate-90 "
            onClick={handleInteract}
          >
            {!interact ? "Praticar" : "Aprender"}
          </button>
          <p className='text-white font-bold text-[22px]'>Adjetivos - Aplicação</p>
          {interact 
            ? 
            <Interact adjectives={dataAdjectives} />
            : 
            <Read adjectives={dataAdjectives} />
          }
            
          <p className='text-[#9f50ac] pt-1 pb-1 text-[18px] '>
            ou
          </p>
          <Button
            text="Voltar"
            addStyle="w-[180px] ml-auto mr-auto"
            disabled={false} 
            onClick={handleClickReturn} 
          />
      </div>    
    )
  } else {
    return (
      <div className='text-center flex flex-col justify-center'>     
          <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não foi encontrada.</p>    
      </div>
    )
  }
 
}

export default Aplicacao