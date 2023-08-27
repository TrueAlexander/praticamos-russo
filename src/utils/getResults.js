import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

const getResults = async (email, name) => {
  
  try {

    const res = await fetch("/api/get-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email})
    })

    if (res.status === 201) {
      const bestScores = await res.json()   
      return bestScores.res
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

export default getResults
