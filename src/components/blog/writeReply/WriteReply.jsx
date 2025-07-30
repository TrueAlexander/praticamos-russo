"use client"
import { useRef, useState, useEffect } from "react"
import styles from "./writeReply.module.css"
import { ThemeContext } from "@/context/ThemeContext"
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import '@/utils/react-confirm-alert.css'
import confirmAlertStyles from '@/utils/confirmAlert.module.css'
import { moderateText } from "@/utils/moderateText"

export default function WriteReply({ handleSubmit, author, authorEmail, postId, parentId, setWriting}) {

  const {theme} = useContext(ThemeContext)
  const themeClass = theme === 'dark' ? confirmAlertStyles.darkConfirmAlert : confirmAlertStyles.lightConfirmAlert

  const textareaRef = useRef(null)
  const [text, setText] = useState("")
  const maxLength = 250

  const handleNewReply = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    if(text.length < 3 || text.length > maxLength) {
      confirmAlert({
        customUI: ({ onClose }) => (
          <div className={themeClass}>
            <p>Sua resposta deve conter entre 3 e 250 caracteres!</p>
            <button 
              className="button"
              onClick={() => { onClose(); }}
            >
              Ok
            </button>
          </div>
        ),
      })
    } else {
      const y = window.scrollY
      const commentData = { author: author, text: moderateText(text.charAt(0).toUpperCase() + text.slice(1)), authorEmail }
      await handleSubmit(commentData, postId, parentId)
         // Принудительно ждём, пока DOM обновится
    setTimeout(() => {
      window.scrollTo({ top: y, behavior: "auto" })
    }, 50)
      setText()
      setWriting(false)
    }
  }
  ///autofocus on textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  return (
    <form className={styles.write} onSubmit={handleNewReply}>
      <div className={styles.inputBox}>
        <textarea
          ref={textareaRef}
          value={text}
          className={styles.input}
          onChange={(e) => setText(e.target.value)}
          placeholder="escreve sua resposta..."
        />
        <div
          className={`${styles.counter} ${text?.length >= maxLength ? styles.limitReached : ''}`}
        >
          {text?.length} / {maxLength}
        </div>
      </div>
      <button 
        className="button" 
        type="submit"
        disabled={!text ? true : false}
      >
        Publicar
      </button>
     
    </form>
  )
}