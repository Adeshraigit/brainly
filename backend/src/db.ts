import mongoose, { model, Schema} from "mongoose";
import dotenv from "dotenv";

mongoose.connect("mongodb+srv://adeshBrain:brain@cluster0.jbrtgk7.mongodb.net/brainly?retryWrites=true&w=majority&appName=Cluster0") 

const UserSchema = new Schema({
    username: {type: String, unique: true},    
    password: String,   
})

export const UserModel = model( "User",UserSchema)