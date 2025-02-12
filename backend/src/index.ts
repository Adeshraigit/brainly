import express from "express";
import jwt from "jsonwebtoken";  
import { UserModel } from "./db";     

const JWT_SECRET = "!secret" 

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username        
    const password = req.body.password

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
    const username = req.body.username        
    const password = req.body.password
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

app.post("/api/v1/content", (req, res) => {
    
})

app.get("/api/v1/content", (req, res) => {
    
})

app.delete("/api/v1/content", (req, res) => {
    
})

app.post("/api/v1/brain/share", (req, res) => {
    
})  

app.get("/api/v1/brain/:shareLink", (req, res) => {
    
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})