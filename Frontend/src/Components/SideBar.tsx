import { TwitterIcon } from "./icons/TwitterIcon";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import { Logo } from "./Logo";
import { SideBarItem } from "./SideBarItem";

export function SideBar(){
    return <div className="h-screen bg-white w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-8 items-center"> 
            <div className="pr-2 text-purple-600">
                <Logo/>
        
            </div>
            
            Brainly

        </div>

        <div className="pt-8 pl-4 ">
           <SideBarItem text = "Twitter" icon = {<TwitterIcon/>} />
           <SideBarItem text = "Youtube" icon = {<YoutubeIcon/>} />
            
            

        </div>
    </div>
}