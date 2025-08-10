// "use client"
// import styles from "./commentsClient.module.css"
// import ResponderButton from "../responderButton/ResponderButton"
// import { useContext } from "react"
// import { CommentsContext } from "@/context/CommentsContext"

// const CommentsClient = ({postId}) => {

//   const { comments } = useContext(CommentsContext)
//   // console.log("comments from CommentsClient to render: ", comments)

//   if (!comments) {
//     return <p>Ainda não há comentários!</p> // You can show an error message if no data is returned
//   }

//   return (
//     <div className={`${styles.container} animate__animated animate__fadeIn`}>
//       <div className={`${styles.comments} `}>
//           {comments.length === 0 ? (
//             <p>Seja o primeiro a comentar!</p>
//             ) : comments.slice().reverse().map((item, index) => (
//               <div className={styles.comment} key={index}>
//                 <div className={styles.user}>
//                   <div className={styles.userInfo}>
//                     <span className={styles.username}>{item.author}</span>
//                     <span className={styles.date}>{(() => { const d = new Date(item.date); return d.toLocaleTimeString('ru-RU', { hour12: false }) + '\u00A0'.repeat(4) + d.toLocaleDateString('ru-RU'); })()}
//                     </span>
//                   </div>
//                 </div>
//                 <p className={styles.content}>{item.text}</p>
//                 <ResponderButton postId={postId} parentId={item._id}/>
//                 {item.replies.length > 0 && (
//                   [...item.replies].reverse().map(i => (
//                   <div className={styles.replies} key={i._id}>
//                     <div className={styles.user}>
//                       <div className={styles.userInfo}>
//                         <span className={styles.username}>{i.author}</span>
//                         <span className={styles.date}>{(() => { const d = new Date(i.date); return d.toLocaleTimeString('ru-RU', { hour12: false }) + '\u00A0'.repeat(4) + d.toLocaleDateString('ru-RU'); })()}
//                         </span>
//                       </div>
//                     </div>
//                     <p className={styles.content}>{i.text}</p>
//                   </div>))
//                 )}
//               </div>  
//             ))}
//       </div>
//     </div>
//   )
// }

// export default CommentsClient