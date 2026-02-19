import mongoose, { mongo, Mongoose } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true }
});


const User= new mongoose.model("User",UserSchema);
export default User



export const generateToken=(user)=>{
    return jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
}
export const hashPassword=async (password)=>{
    const res=await  bcrypt.hash(password,10)
    return res

}
export const comparePassword=async (password,hashedPassword)=>{
   const res=await  bcrypt.compare(password,hashedPassword)
   return res
}