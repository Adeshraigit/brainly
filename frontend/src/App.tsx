import { Button } from "./components/Button"
import { Card } from "./components/Card"
import { PlusIcon } from "./icons/Plusicon"
import { ShareIcon } from "./icons/ShareIcon"


function App() {
  return (
    <div className="p-4">
      //01:44:32
      <div className="flex justify-end gap-4">
      <Button variant="primary" text="Add content" starIcon={<PlusIcon/>} />
      <Button variant="secondary" text="Share brain" starIcon={<ShareIcon/>} />
      </div>
      <div className="flex gap-4">
      <Card title="First Video" link="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="youtube" />
      <Card title="First Tweet" link="https://x.com/obobnunes/status/1575663291598139392" type="twitter"  />
      </div>
    </div>
  )
}

export default App
