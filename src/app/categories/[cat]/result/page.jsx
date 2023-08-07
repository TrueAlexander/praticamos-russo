"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import Button from '@/components/Button/Button'
import { useSession } from 'next-auth/react'

const ResultPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const session = useSession()
  const result = searchParams.get('res')
  const total = searchParams.get('total')
  const category = searchParams.get('cat')
  const user = searchParams.get('user')
  const email = session.data.user.email

  const handleClick = async () => {

    try {
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          category,
          result,
        }),
      })

      if (res.status === 201 || 200) {
        router.push('/categories')
      }

      // if (res.status === 201) {
      //   confirmAlert({
      //     message: `Prezado ${name}, seu usuário foi criado! Faz por favor login!`,
      //     buttons: [
      //       {
      //         label: 'Ok',
      //         // onClick: () => {}
      //       }
      //     ]
      //   })
      // } else {
      //   confirmAlert({
      //     message: "Deu errado! Será que o usuário ja existe? Faz login ou tente outra vez!",
      //     buttons: [
      //       {
      //         label: 'Ok',
      //         // onClick: () => {}
      //       }
      //     ]
      //   })  
      // }
    } catch (err) {   
      console.log(err, "Erro do lado de servidor!")
    }

    
  }

  return (
    <div className='text-white text-center uppercase flex flex-col justify-center'>
      <p className='text-white p-4 font-bold'>{`${user}, seu resultado:`}</p>
      <p className="p-6 text-[#9f50ac] font-bold text-[24px]" >{category}</p>
      <p className="p-6  font-bold text-[34px]" >{result} <span className='text-[24px] text-[#9f50ac] lowercase'>de</span> {total}</p>
      <p className="lowercase text-[#9f50ac] mb-6">Tente fazer o teste de novo</p>
      <Button text='Praticar mais!' disabled={false} onClick={handleClick}/>
    </div>
    
  )
}

export default ResultPage