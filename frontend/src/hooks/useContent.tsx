import axios from "axios"
import { useState, useEffect } from "react"    
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => {
            setContents(res.data.content)
            console.log(res.data.content)
        }).catch(e => {
            console.log(e)  
        })
    }, []) 

    return contents;
}