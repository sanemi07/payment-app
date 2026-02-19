import mongoose, { Types } from "mongoose";


const accountSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },balance:{
        type:Number,
        required:true
        
    }
})
const  Account= new mongoose.model('account',accountSchema)
export default Account