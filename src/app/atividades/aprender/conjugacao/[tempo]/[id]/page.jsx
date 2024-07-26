'use client'
//utils
import { shuffleArray } from "@/utils/arrayUtils"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useEffect, useState } from "react"
import { useSession, signOut } from 'next-auth/react' 
import dataVerbsPresent from '../../../../../../../dataVerbsPresent.json'
import dataVerbsPast from '../../../../../../../dataVerbsPast.json'
//Components
import Loading from "../loading"
import Button from "@/components/globals/Button/Button"
import { useRouter } from "next/navigation"
// import OnlyNameShow from '@/components/OnlyNameShow/OnlyNameShow'
import ReadVerb from '@/components/verbs/ReadVerb/ReadVerb'
import InteractVerb from "@/components/verbs/InteractVerb/InteractVerb"


const VerbTense = ({params}) => {
  
  const router = useRouter()
  const session = useSession()
  // const nameShow = session.data?.user?.name

  const id = params.id
  const tense = params.tempo
  const dataVerbs = tense === "passado" ? dataVerbsPast : dataVerbsPresent
  const verb = dataVerbs[id]

  const [interact, setInteract] = useState(false)

  const conjugations = verb.answers

  const audios = verb.audios || ""
  
  const pronouns = tense !== "passado" 
  ? [
    ["Я", "Eu"],
    ["Ты", "Você"],
    ["Он/Она́", "Ele/Ela"],
    ["Мы", "Nós"],
    ["Вы", "Vocês"],
    ["Они́", "Eles/Elas"],
  ]
  : [
    ["Он", "Ele"],
    ["Она́", "Ela"],
    ["Оно́", "Isso"],
    ["Они́", "Eles"],
  ] 

  const handleClick = () => {
    if (!interact) {
      confirmAlert({
        message: (
          <div style={{ textAlign: "center"}}>
            Clique nas formas de verbo: <p style={{ color: '#9f50ac', fontSize: 20, fontWeight: 700, marginTop: 10, marginBottom: 10 }}> {verb.infinitive} </p> para completar os exemplos de conjugação
          </div>
        ),
        buttons: [
          {
            label: 'Ok',
            onClick: () => setInteract(!interact)  
          }
        ]
      })
    } else {
      setInteract(!interact)
    }
  }

  if (session.status === "loading") {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (session.status === "authenticated") {
    return ( 
      <div className='fixed z-[10000] top-0 bottom-0 overflow-y-auto bg-[#2b2737] text-center flex flex-col justify-center' >
          {/* <OnlyNameShow nameShow={nameShow}/> */}
          <button 
            className="text-white tracking-wider active:scale-95  h-[23px] min-w-[90px] rounded-[10px] bg-[#9f50ac] fixed top-1/2 transform -translate-y-1/2 right-0 lg:mr-[345px] md:mr-[200px] rotate-90 "
            onClick={handleClick}
          >
            {!interact ? "Praticar" : "Aprender"}
          </button>
          <p className='text-white p-1 text-[22px]'>{verb.infinitive}</p>
          {interact 
            ? <InteractVerb conjugations={conjugations} pronouns={pronouns} />
            : <ReadVerb conjugations={conjugations} pronouns={pronouns} audios={audios} />
          }
          <p className='text-[#9f50ac] pt-1 pb-1 text-[18px] '>
            ou
          </p>
          <Button
            text="à lista de verbos"
            addStyle="w-[180px] ml-auto mr-auto"
            disabled={false} 
            onClick={() => router.push(`/atividades/aprender/conjugacao/${tense}`)} 
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

export default VerbTense