'use client'
//utils
import { shuffleArray } from "@/utils/arrayUtils"
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import { useEffect, useState } from "react"
import { useSession, signOut } from 'next-auth/react' 
import dataVerbs from '../../../../../../../dataVerbs.json'
//Components
import Loading from "../loading"
import { useSearchParams } from "next/navigation"
import Button from "@/components/Button/Button"
import { useRouter } from "next/navigation"
import OnlyNameShow from '@/components/OnlyNameShow/OnlyNameShow'
import ReadVerb from '@/components/ReadVerb/ReadVerb'
import InteractVerb from "@/components/InteractVerb/InteractVerb"


const VerbTense = ({params}) => {
  
  const router = useRouter()
  const session = useSession()
  const nameShow = session.data?.user?.name
  // const searchParams = useSearchParams()
  // const repeat = searchParams.get('rep')
  const id = params.id
  const verb = dataVerbs[id]

  const [interact, setInteract] = useState(false)

  const conjugations = verb.answers

  //
  const audios = verb.audios || ""

  //

  console.log(audios)
  
  const pronouns = [
    ["Я", "Eu"],
    ["Ты", "Você"],
    ["Он/Она́", "Ele/Ela"],
    ["Мы", "Nós"],
    ["Вы", "Vocês"],
    ["Они́", "Eles/Elas"],
  ]
  // ["Он/Она́/Оно́", "Ele / Ela"],
  //////

  // return (
  //   <div className={interact 
  //     ? styles.verbsAction + " container" 
  //     : styles.verbs + " container"}
  //   >
  //     <h2 className={styles.verbsTitle}>Conjugación del verbo: <span>{verb.infinitive}</span></h2>
  //     {interact 
  //       ? <Interact conjugations={conjugations} pronouns={pronouns} />
  //       : <Read conjugations={conjugations} pronouns={pronouns} />}
  //     <button
  //       className="btn btn-forward"
  //       onClick={() => setInteract(!interact)}
  //     >
  //       &#8594;
  //     </button>
  //     <ButtonBack/>
  //   </div>
    
  // )



  /////

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
            onClick={() => setInteract(!interact)}
          >
            {!interact ? "Praticar" : "Aprender"}
          </button>
          {/* <p className='text-white font-bold text-[16px]'>Conjugação do verbo:</p> */}
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
            onClick={() => router.push('/atividades/aprender/conjugacao/presente')} 
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