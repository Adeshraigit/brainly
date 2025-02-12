import express from "express";
import jwt from "jsonwebtoken";  
import { UserModel, ContentModel } from "./db";    
import { JWT_SECRET } from "./config";      
import { userMiddleware } from "./middleware";

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
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
    const { link, title } = req.body 

    try {
        await ContentModel.create({
            title : title,  
            link: link,
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

app.post("/api/v1/brain/share", (req, res) => {
    
})  

app.get("/api/v1/brain/:shareLink", (req, res) => {
    
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})