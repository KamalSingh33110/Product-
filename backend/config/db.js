import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();//calling .env file here 
export const connectDB= async()=>{

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB Connected :${conn.connection.host}`)
        
    } catch (error) {
        
        console.error(`error: ${error.message}`);
        process.exit(1)// code 1 means exit with failure ,0 means succes
    }
}