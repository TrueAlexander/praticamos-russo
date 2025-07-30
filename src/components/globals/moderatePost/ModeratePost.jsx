"use client"
import { useSession } from "next-auth/react"

const ModeratePost = ({moderated}) => {

  const session = useSession()
  const isAdmin = session.data?.user.isAdmin

  if(isAdmin && !moderated) {
    return (
      <div style={{ backgroundColor: 'crimson', color: 'white', padding: '8px' }}>Moderar!!!</div>
    )
  }
 
}

export default ModeratePost