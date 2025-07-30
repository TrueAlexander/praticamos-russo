"use client"
import styles from "./postarButtonMob.module.css"
import Link from "next/link"
import { useSession } from "next-auth/react"

const PostarButtonMob = () => {

  const {status} = useSession()

  if (status === "authenticated") {
    return (<Link className={`${styles.button} button`} href="/criar">Postar...</Link>)
  } 
}

export default PostarButtonMob