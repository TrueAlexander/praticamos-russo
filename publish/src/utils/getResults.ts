import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'

interface ResultItem {
  casos?: number;
  vocabulario?: number;
  verbos?: number;
  category?: any;
}

const getResults = async (email: string, name: string): Promise<ResultItem[] | undefined> => {
  
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
      return bestScores.res as ResultItem[]
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
