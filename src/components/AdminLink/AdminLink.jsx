import Link from "next/link"
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

const AdminLink = () => {
  return (
    <div 
      className="text-white text-[24px] absolute bottom-5 right-2"
      title="Admin Painel"
    >
      <Link href="/admin">
        <MdOutlineAdminPanelSettings/>
      </Link>
    </div>
  )
}

export default AdminLink
