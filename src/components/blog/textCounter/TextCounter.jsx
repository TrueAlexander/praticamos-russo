"use client"

import { getPlainText } from "@/utils/getPlainText"
import { useEffect, useState } from "react"
import styles from "./textCounter.module.css"

const TextCounter = ({
  input = "",         // texto or HTML
  min = 0,            // min
  max = null,         // max
  stripHtml = false,  // if true extract text from content
}) => {

  const [textLength, setTextLength] = useState(0)

  useEffect(() => {
    const raw = stripHtml ? getPlainText(input) : input
    setTextLength(raw.trim().length)
  }, [input, stripHtml])

  const isInvalid = (min && textLength < min) || (max && textLength > max)

  return (
    <p
      className={`${styles.counter} ${isInvalid ? styles.invalid : styles.valid}`}
    >
      {textLength}
      {min ? ` / mínimo ${min}` : ""}
      {max ? ` / ${max}` : ""}
    </p>
  )
}

export default TextCounter