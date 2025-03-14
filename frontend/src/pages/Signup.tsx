import { useRef } from "react"  
import axios from "axios"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom"  

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);   
    const navigate = useNavigate();

    function signUp() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        // console.log(username,password)
        axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
        })
        alert("Signed Up");
        navigate("/signin");
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center" >
        <div className="bg-white rounded-xl border min-w-48 p-8" >
            <Input reference={usernameRef} placeholder={'Username'} />
            <Input reference={passwordRef} placeholder={'Password'} />
            <div className="flex justify-center pt-4" >
            <Button onClick={signUp} loading={false} variant="primary" text="Signup" fullWidth={true} />
            </div>
        </div>
    </div>
}