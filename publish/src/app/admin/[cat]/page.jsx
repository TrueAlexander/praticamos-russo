"use client"
import AdminQuestions from "@/components/admin/AdminQuestions/AdminQuestions"
import Link from "next/link"
import { useState, useEffect } from 'react'
import getQuestionsByCategory from "@/utils/getQuestionsByCategory"

const CategoryAdminPage = ({params}) => {

  const category = params.cat

///create anchor to get updated questions list
  const [anchorUpdate, setAnchorUpdate] = useState(false)
  const [questions, setQuestions] = useState([])

 useEffect(() => {
  const fetchQuestions = async () => {
    const result = await getQuestionsByCategory(category);
    setQuestions(result)
  }

  fetchQuestions()
}, [anchorUpdate, category])
  return (
    <div className="fixed z-[10000] top-0 bg-[#2b2737] pt-5 bottom-12 left-0 right-0  overflow-y-auto text-center">
      <Link href="/admin">
        <button className="bg-[#9f50ac] text-[12px] font-bold h-[20px] min-w-[100px] rounded-[7px] text-white mr-2 ml-2 mb-4"> ← Categorias</button>
      </Link>
      <div className='lg:max-w-[450px] max-w-[300px] mx-auto text-center flex flex-col justify-center '>
        <AdminQuestions 
          questions={questions}
          anchorUpdate={anchorUpdate}
          setAnchorUpdate={setAnchorUpdate}
          category={category}
        />
      </div>
    </div>
  )
}

export default CategoryAdminPage
