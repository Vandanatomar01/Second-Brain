import { ReactElement } from "react";

export function SideBarItem({text, icon} :{
    text : string,
    icon : ReactElement }){
    return <div className="flex items-center text-gray-700 py-2 pl-4 cursor-pointer hover:bg-gray-200 rounded 
    max-w-48 transition-all duration-150">
        <div className="pr-2 ">
            {icon}
        </div>
        <div >
          {text} 
        </div>

    </div>
}