// import { useState } from "react"
// import { Button } from "../components/Button"
// import { Card } from "../components/Card"
// import { PlusIcon } from "../icons/PlusIcon"
// import { ShareIcon } from "../icons/ShareIcon"
// import { CreateContentModal } from "../components/CreateContentModal"    
// import { Sidebar } from "../components/Sidebar"
// import { useContent } from "../hooks/useContent"  

// export function Dashboard() {

//   const [modalOpen, setModalOpen] = useState(false)
//   const contents = useContent()
//   console.log(contents)

//   return (
//     <div>
//       <Sidebar/>
//       <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
//         <CreateContentModal open={modalOpen} onClose={() => {
//           setModalOpen(false)
//         }} /> 
//           <div className="flex justify-end gap-4">
//           <Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" starIcon={<PlusIcon/>} />
//           <Button variant="secondary" text="Share brain" starIcon={<ShareIcon/>} />
//           </div>
//           <div className="flex gap-4">
//             {contents.map(({type, link, title}) => <Card 
//             type={type} 
//             link={link} 
//             title={title} /> )}
//           </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { CreateContentModal } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  // console.log(contents);

  useEffect(() => {
    refresh();
  }, [modalOpen]);   

  return (
    <div>
      <Sidebar />
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        
        <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-end gap-4">
          <Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" starIcon={<PlusIcon />} />
          <Button onClick={ async () => {
            const res = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
              share: true
            }, {
              headers: {
                Authorization: localStorage.getItem("token")}
              }
            );
            console.log(res.data.link);
            const shareUrl = `http://localhost:5173/share/${res.data.link}`;
            alert(shareUrl);
          }} variant="secondary" text="Share brain" starIcon={<ShareIcon />} />
        </div>

          <div className="flex gap-4 flex-wrap">
            {contents.map(({ id, type, link, title }) => (
              <Card key={id} type={type} link={link} title={title} />
            ))}
          </div>
      
      </div>
    </div>
  );
}

export default Dashboard;
