import Link from "next/link"
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

const AdminLink = () => {
  return (
    <div 
      className="text-white text-[24px] fixed bottom-5 right-2 z-[10000]"
      title="Admin Painel"
    >
      <Link href="/admin">
        <MdOutlineAdminPanelSettings/>
      </Link>
    </div>
  )
}

export default AdminLink
