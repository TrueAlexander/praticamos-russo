import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const getLearnt = async (email, name) => {
  
  try {

    const res = await fetch("/api/get-learnt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email})
    })

    if (res.status === 201) {
      const learntArray = await res.json()   
      return learntArray.res
    }
    
  } catch (error) {
    confirmAlert({
      message: `Prezado ${name}, infelizmente o servidor não está disponivel, tente mais tarde!`,
      buttons: [
        {
          label: 'Ok',
          onClick: () => {
          }
        }
      ]
    })
  }
}

export default getLearnt
