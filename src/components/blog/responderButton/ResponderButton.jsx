"use client"
import { useState, useRef, useEffect,  } from "react"
import styles from "./responderButton.module.css"
import Loading from "@/app/loading"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'
import { useSession } from "next-auth/react"
import "animate.css"
import WriteReply from "../writeReply/WriteReply"
import { CommentsContext } from "@/context/CommentsContext"

const ResponderButton = ({postId, parentId}) => {

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert
  const {status} = useSession()
  const session = useSession()
  const { handleSubmit } = useContext(CommentsContext)
  const responseBoxRef = useRef(null) // Ref for the box
  const [writing, setWriting] = useState(false)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (responseBoxRef.current && !responseBoxRef.current.contains(event.target)) {
        setWriting(false)
      }
    }

    if (writing) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [writing])

  //show input for new comment
  const handleClick = () => {
    if(status !== "authenticated") {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>Acesse sua conta para deixar um comentário</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else if (status === "authenticated") {
      setWriting(true)
    }
  }

  return (
    writing ? (
      <div>
        <div
          ref={responseBoxRef}
          className={`${styles.responseBox} ${"animate__animated"} ${"animate__fadeIn"}`}
        >
          <WriteReply 
            author={session?.data?.user.name}
            authorEmail={session?.data?.user.email}
            handleSubmit={handleSubmit}
            postId={postId}
            parentId={parentId}
            setWriting={setWriting}
          />
          <button
            className={styles.button}
            onClick={() => setWriting(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ) : (
      <button
        className={`${styles.button} ${"animate__animated"} ${"animate__fadeIn"}`}
        onClick={handleClick}
      >
        Responder
      </button>
    )
  )
}

export default ResponderButton

