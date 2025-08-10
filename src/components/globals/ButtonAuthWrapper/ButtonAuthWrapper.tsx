'use client'

import { useState } from 'react'
import ButtonAuth from '../ButtonAuth/ButtonAuth'

export default function ButtonStartWrapper() {

  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="fixed left-5 right-5">
      <ButtonAuth  showModal={showModal} setShowModal={setShowModal}/>
    </div>
  ) 
  
}
