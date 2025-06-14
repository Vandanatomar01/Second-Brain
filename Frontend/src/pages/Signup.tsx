import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function Signup(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        // console.log(usernameRef);
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "/api/v1/signup", {
           
                username,
                password
          
        })
        navigate("/signin");
        alert("You have signed up!");
        
        

    }


// export function Signup() {
//     const usernameRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
  
//     async function signup() {
//       const username = usernameRef.current?.value;
//       const password = passwordRef.current?.value;
  
//       try {
//         await axios.post(BACKEND_URL + "/api/v1/signup", {
//           username,
//           password,
//         });
  
//         alert("You have signed up!");
//       } catch (error: any) {
//         console.error("Signup failed:", error.response?.data?.message || error.message);
//         alert(error.response?.data?.message || "Signup failed. Try again.");
//       }
//     }
  

    return <div className = "h-screen w-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-4 ">
            <Input reference = {usernameRef} placeholder="Username" />
            <Input reference = {passwordRef} placeholder="Password" />

            <div className= "flex justify-center">
            <Button onClick= {signup} loading = {false} variant="primary" text="Signup " fullWidth = {true} />

            </div>
            

        </div>

    </div>
}