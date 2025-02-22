import express from "express";
import jwt from "jsonwebtoken";  
import { UserModel, ContentModel, LinkModel } from "./db";    
import { JWT_SECRET } from "./config";      
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors" 

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Hello World1")
})

app.post("/api/v1/signup", async (req, res) => {
    const { username, password   } = req.body

    try {
        await UserModel.create({
            username: username,
            password: password  
        })

        res.status(200).json({
            message: "User Signed Up"
        })  
    } catch (e) {
        res.status(411).json({
            message: "User Already Exists"          
        })
    }     
})

app.post("/api/v1/signin", async (req, res) => {
    const { username, password   } = req.body

    const existingUser = await UserModel.findOne({
        username: username,
        password: password
    })

    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SECRET)  
        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Invalid Credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const { link, title, type } = req.body 

    try {
        await ContentModel.create({
            title : title,  
            link: link,
            type: type,
            // @ts-ignore   
            userId: req.userId,
            tags: []  
        })
    
        res.status(200).json({message: "Content Added"})
    } catch (e) {
        console.log("Error Adding Content",e)
        res.status(500).json({message: "Error Adding Content"})
    }
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    //@ts-ignore   
    const userId = req.userId   

    try {
        const content = await ContentModel.find({userId: userId}).populate("userId", "username")      

        res.status(200).json(content)
    } catch (e) {
        console.log("Error Fetching Content",e) 
        res.status(500).json({message: "Error Fetching Content"})
    }
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.id

    try {
        await ContentModel.deleteMany({
            contentId,
            //@ts-ignore    
            userId: req.userId
        })
        res.status(200).json({message: "Content Deleted"})
    } catch (e) {
        console.log("Error Deleting Content",e)
        res.status(500).json({message: "Error Deleting Content"})
    }
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body  

    const existingLink = await LinkModel.findOne({
        // @ts-ignore       
        userId: req.userId  
    })

    if(existingLink) {
        res.json({
            link : existingLink.hash    
        })
        return
    }

    if(share) {
        const hash = random(10)     
        await LinkModel.create({
            hash: hash, 
            // @ts-ignore   
            userId: req.userId,
        })
        res.json({
            hash: hash      
        })
    } else {
        await LinkModel.deleteOne({
            // @ts-ignore   
            userId: req.userId  
        })
        res.json({
            message: "Removed link"       
        })
    }
})  

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink

    const link = await LinkModel.findOne({
        hash: hash
    })  

    if(!link) {
        res.status(411).json({
            message: "Invalid Link"
        })     
        return 
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    if(!user) {
        res.status(411).json({
            message: "User not found"       
        })     
        return 
    }

    res.status(200).json({
        username: user?.username,       
        content: content
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})