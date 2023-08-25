import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const checkIsAdmin = async (email, name) => {
  
  try {

    const res = await fetch("/api/is-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, name})
    })

    if (res.status === 201) {
      const response = await res.json()
      
      return response.isAdmin
    }
    
  } catch (error) {
    console.log(error)
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

export default checkIsAdmin
