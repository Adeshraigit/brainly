import mongoose, { model, Schema} from "mongoose";
import dotenv from "dotenv";

mongoose.connect("mongodb+srv://adeshBrain:brain@cluster0.jbrtgk7.mongodb.net/brainly?retryWrites=true&w=majority&appName=Cluster0") 

const UserSchema = new Schema({
    username: {type: String, unique: true},    
    password: String,   
})

export const UserModel = model( "User",UserSchema)


const ContentSchema = new Schema({
    title: String,  
    link: String,   
    tags: [{type: Schema.Types.ObjectId, ref: "Tag"}],
    type: String,
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true}, 
})

export const ContentModel = model( "Content",ContentSchema) 

const LinkSchema = new Schema({
    hash: String,
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true, unique: true},   
})

export const LinkModel = model("Link", LinkSchema)