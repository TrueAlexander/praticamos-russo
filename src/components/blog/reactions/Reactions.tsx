"use client"
import { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa"
import { useSession } from 'next-auth/react'

interface ReactionsProps {
  id?: string
}

const Reactions: React.FC<ReactionsProps> =  ({id}) => {

  const {data} = useSession()

  const [likes, setLikes] = useState(0)
  const [likedBy, setLikedBy] = useState([])
  const [alreadyLiked, setAlreadyLiked] = useState(false)


  // const getReactions = async (id) => {
  //   let reactions = {likes: 0, views: 0}
  //   if (id) {
  //     try {
  //       const res = await fetch("/api/get-reactions", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ id }),
  //         cache: "no-store",
  //       })
  
  //       const data = await res.json()
  //       reactions = {likes: data.res.likes || 0, views: data.res.views || 0, likedBy: data.res.likedBy || []}
        
  //       // Check if the current user already liked the post
  //       if (data?.res?.likedBy.includes(data?.user?.email)) {
  //         setAlreadyLiked(true)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   return reactions
  // }
 
  // useEffect(() => {
  //   ///to call the function that fetch the actual likes and views from the backend
  //   getReactions(id).then(res => {
  //     setLikes(res.likes)
  //     setViews(res.views)
  //     setLikedBy(res.likedBy)
  //     if (res?.likedBy?.includes(data?.user?.email)){
  //       setAlreadyLiked(true)
  //     }
  //   })
  // }, [id, data?.user?.email])


  // const handleLiked = async () => {
  //   if (!data) {
  //     confirmAlert({
  //       customUI: ({ onClose }) => (
  //         <div className={themeClass}>
  //           <p>É preciso fazer login para curtir a postagem.</p>
  //           <button 
  //             className="button"
  //             onClick={() => { onClose(); }}
  //           >
  //             Ok
  //           </button>
  //         </div>
  //       ),
  //     })
  //   } else {
  //     //check if the email of the user is inside the likedBy
  //     if (likedBy.includes(data?.user?.email)) {
  //       confirmAlert({
  //         customUI: ({ onClose }) => (
  //           <div className={themeClass}>
  //             <p>Você já curtiu esta postagem!</p>
  //             <button 
  //               className="button"
  //               onClick={() => { onClose(); }}
  //             >
  //               Ok
  //             </button>
  //           </div>
  //         ),
  //       })
  //     } else {
  //         try {
  //           const res = await fetch("/api/like-the-post", {
  //             method: "PUT",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ id, email: data?.user?.email}),
  //             cache: "no-store",
  //           })
  //           const result = await res.json()
  //           console.log(result.res.message)
  //           setAlreadyLiked(true)
           
  //           // Fetch the updated reactions
  //           const updatedReactions = await getReactions(id)
  //           setLikes(updatedReactions.likes)   // Update the likes state
  //           setViews(updatedReactions.views)  // Update the views state
  //           setLikedBy(updatedReactions.likedBy)  // Update the likedBy state
  //           } catch (error) {
  //           console.log(error)
  //         }  
  //       }
  //   }  
  // }

  return (
    <div className="flex gap-5 text-[23px] text-[#9f50ac] justify-end mb-2">
      <div
        title="curtidas"
        // onClick={handleLiked}
        className="flex items-center cursor-pointer hover:scale-110"
      >
        {!alreadyLiked ? <FaRegHeart /> : <FaHeart />}
        <span className="ml-1 text-[16px] font-light leading-[18px] align-text-top ">
          {likes}
        </span>
      </div>
    </div>
  )
}

export default Reactions