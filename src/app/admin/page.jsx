'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
//Components
import Button from '@/components/globals/Button/Button'
import ButtonAuth from '@/components/globals/ButtonAuth/ButtonAuth'
import { useSession, signOut } from 'next-auth/react' 
import Loading from './loading'
// import checkIsAdmin from '@/utils/checkIsAdmin'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const AdminPage = () => {
  const router = useRouter()
  const session = useSession()

  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  
  useEffect(() => {
    if (session.status === "loading") {
      setIsLoading(true)
    } else if (session.status === "unauthenticated") {
      router.push('/')
    } else {
      if(session.data.user.isAdmin) {
        setIsLoading(false)
        setIsAdmin(true)
      } else {
        router.push('/')
      }
    }

  }, [session.status, router, session.data?.user.isAdmin])

  const handleClick = (e) => router.push(`/admin/${e.target.name}`)

  if (isLoading) {
    return (
      <div className="flex-auto flex flex-col justify-center">
        <Loading/> 
      </div>
    )
  } else if (isAdmin) {
    return (
      <div className='text-center flex flex-col justify-center' >
        <ButtonAuth name="Admin" signOut={signOut} nameShow="Admin" setIsLoading={setIsLoading}/>
        <p className='text-white p-4 font-bold text-[20px]'>Gestão de exercícios!</p>
        <p className='text-[#9f50ac] pt-4 pb-4 text-[18px] '>
          Para gestionar exercícios escolhe uma categoría:
        </p>
        <Button name='vocabulario' text='Vocabulário' disabled={false} onClick={handleClick} />
        <Button addStyle="my-4" name='verbos' text='Verbos' disabled={false} onClick={handleClick} />
        <Button name='casos' text='Casos' disabled={false} onClick={handleClick} />
      </div>
    )
  } 
}


export default AdminPage







