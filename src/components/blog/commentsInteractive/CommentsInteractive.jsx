// "use client"
// import { useSession } from "next-auth/react"
// import styles from "./commentsInteractive.module.css"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import CommentsClient from "../commentsClient/CommentsClient"
// import WriteComment from "../writeComment/WriteComment"
// import Loading from "@/app/loading"
// import { useContext } from "react"
// import { CommentsContext } from "@/context/CommentsContext"


// const CommentsInteractive = ({postId, parentId}) => {

//   const {status} = useSession()
//   const session = useSession()

//   //client side comments, stored in context
//   const { comments } = useContext(CommentsContext)
//   const { handleSubmit  } = useContext(CommentsContext)

//   const [isLoading, setIsLoading] = useState(false)

//   // Hide the static server-rendered comments
//   useEffect(() => {
//     if (comments) { 
//       const staticEl = document.getElementsByClassName("static-comments")[0]
//       if (staticEl) staticEl.style.display = "none"
//     }
//   }, [comments])

//   if(isLoading) {
//     return <Loading/>
//   }

//   return (
//     <>
//       {status === "authenticated" ? (
//          <WriteComment handleSubmit={handleSubmit} author={session.data?.user?.name} authorEmail={session.data?.user?.email} postId={postId} parentId={parentId}/>
//       ) : (
//         <Link href=""><p className={styles.notice}>Acesse sua conta para deixar um comentário</p></Link>
//       )}
//       {comments && <CommentsClient postId={postId}/>}
//     </>
 
//   )
// }

// export default CommentsInteractive
