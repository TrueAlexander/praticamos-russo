// components/globals/Button/ButtonWrapper.tsx
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from "@/components/globals/Button/Button"
import ButtonAuth from '../ButtonAuth/ButtonAuth'

export default function ButtonStartWrapper() {
  const { status } = useSession()
  const router = useRouter()
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleClick = () => status === "authenticated" ? router.push('/atividades') : setShowModal(true)

  return (
    <>
      <Button
        text={status === 'authenticated' ? 'Começar!' : 'Entrar'}
        disabled={false}
        onClick={handleClick}
      />
      <ButtonAuth showModal={showModal} setShowModal={setShowModal}/>
    </>
  )
}
