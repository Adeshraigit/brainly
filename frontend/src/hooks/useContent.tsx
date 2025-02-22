// import axios from "axios"
// import { useState, useEffect } from "react"    
// import { BACKEND_URL } from "../config";

// export function useContent() {
//     const [contents, setContents] = useState([])

//     useEffect(() => {
//         axios.get(`${BACKEND_URL}/api/v1/content`, {
//             headers: {
//                 "Authorization": localStorage.getItem("token")
//             }
//         }).then((res) => {
//             setContents(res.data.content)
//             console.log(res.data)
//         }).catch(e => {
//             console.log(e)  
//         })
//     }, []) 

//     return contents;
// }

import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export function useContent() {
    const [contents, setContents] = useState([]);

    const refresh = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                headers: { "Authorization": token },
            });
            setContents(res.data);
        } catch (err) {
            console.error("Error fetching content:", err);
        }
    };
    
    useEffect(() => {
        refresh();

        let interval = setInterval(() => {
            refresh();
        }, 10  * 1000);  
        
        return () => {
            clearInterval(interval); 
        };
    }, []);

    return { contents: contents || [], refresh};
}
