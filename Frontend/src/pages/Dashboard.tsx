// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import tailwindcss from '@tailwindcss/vite'
import { Button } from '../Components/Button'
import { ShareIcon } from '../Components/icons/ShareIcon'
import { PlusIcon } from '../Components/icons/PlusIcon'
import { Card } from '../Components/Card'
import { CreateContentModal } from '../Components/CreateContentModal'
import { useEffect, useState } from 'react'
import { SideBar } from '../Components/SideBar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const {contents, refresh} = useContent();

    useEffect(() => {
        refresh();
    }, [modalOpen])

    return  <div > 
        
        <SideBar/>
        

        <div className="p-4 ml-72 min-h-screen bg-gray-100 ">

        <CreateContentModal open = {modalOpen} onClose={() =>{
            setModalOpen(false)
        }}/>
        <div className="flex justify-end gap-2">

        <Button onClick = {() => {
            setModalOpen(true);

        }} variant = "primary" text = "Add Content"  startIcon = {<PlusIcon/>}></Button>

        <Button onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                share : true
            }, {
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            });

            const ShareUrl = `http://localhost:5173/share/${response.data.hash}`;
            alert(ShareUrl);
        }} variant = "secondary" text = "Share Brain" startIcon={<ShareIcon/>}></Button>
        </div>

        <div className="flex gap-4 flex-wrap">
            {contents.map(({type,link,title}) => <Card 
            type= {type} 
            link = {link} 
            title={title}/>
            )}
       
     
        </div>
        </div>
        
    
    </div>
  
}


