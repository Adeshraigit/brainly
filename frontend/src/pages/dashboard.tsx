import { useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { CreateContentModal } from "../components/CreateContentModal"    
import { Sidebar } from "../components/Sidebar"

export function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false)
      }} /> 
        <div className="flex justify-end gap-4">
        <Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" starIcon={<PlusIcon/>} />
        <Button variant="secondary" text="Share brain" starIcon={<ShareIcon/>} />
        </div>
        <div className="flex gap-4">
        <Card title="First Video" link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="youtube" />
        <Card title="First Tweet" link="https://x.com/obobnunes/status/1575663291598139392" type="twitter"  />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
