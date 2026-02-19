import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"paymentapp"
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error,"Error connecting to MongoDB");
    }
}