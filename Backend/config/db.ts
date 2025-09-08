import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        if(!process.env.MONGOURI){
         throw new Error ("MONO_URI is not defined in env")
         return
        }
        const connect= await mongoose.connect(process.env.MONGOURI)
        console.log('mongodb connected :',connect.connection.host) 
    } catch (error) {
        console.log('monogo db connecting error',error)
        return
    }
}
export  default connectDB;
