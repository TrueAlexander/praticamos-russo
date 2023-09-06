// import Loading from './loading'
// import { useSession } from 'next-auth/react'
// import { useState, useEffect } from 'react'
// import getQuestionsByCategory from '@/utils/getQuestionsByCategory'
import AdminQuestions from "@/components/AdminQuestions/AdminQuestions"
import Link from "next/link"

const getQuestionsByCategory = async (category)=> {

  const endpointF = `${process.env.URL_BASE}/api/admin/${category}`

  const data = await (await fetch(endpointF, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category }),
  })).json()
  
  if (data) {
    console.log(data)
    return data
  } else {
    return []
  }  
}

const CategoryAdminPage = async ({params}) => {
  // const session = useSession()
  // const [isLoading, setIsLoading] = useState(true)
  // const [isAdmin, setIsAdmin] = useState(false)

  const category = params.cat
  const questions = await getQuestionsByCategory(category)

  return (
    <div className="fixed z-[10000] top-10 bg-[#2b2737] pt-5 bottom-12 left-0 right-0  overflow-y-auto text-center">
      <Link href="/admin">
        <button className="bg-[#9f50ac] text-[12px] font-bold h-[20px] min-w-[100px] rounded-[7px] text-white mr-2 ml-2 mb-4"> ← Categorias</button>
      </Link>
      <div className='lg:max-w-[450px] max-w-[300px] mx-auto text-center flex flex-col justify-center'>
        <AdminQuestions questions={questions} category={category}/>     
      {/* <p className='text-white p-4 mt-6 font-bold text-[22px]'>404. A página solicitada não existe!</p>     */}
      </div>
    </div>

  )
  // useEffect(() => {
  //   const questions = getQuestionsByCategory(category)
  // }, [])
  



  ///POST request to database with category 
  /// ../api/admin/get-questions
  ///if success return array with object with category
  ///map the received array and render


  // useEffect(() => {
  //   if (session.status === "loading") {
  //     setIsLoading(true)
  //   } else if (session.status === "unauthenticated") {
  //     router.push('/')
  //   } else {
  //     if(session.data.user.isAdmin) {
  //       setIsLoading(false)
  //       setIsAdmin(true)
  //     } else {
  //       router.push('/')
  //     }
  //   }

  // }, [session.status])
}

export default CategoryAdminPage
