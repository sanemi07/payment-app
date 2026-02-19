import { Router } from "express";
import zod from "zod";
import User from "../models/user.model.js";
import { hashPassword ,generateToken,comparePassword} from "../models/user.model.js";
import { authMiddleware } from "../middleware/auth.js";

import Account from "../models/account.model.js";






const SignupSchema=zod.object({
    email:zod.string(),
    password:zod.string().min(6),
    firstName:zod.string().min(1),
    lastName:zod.string().min(1)
    
})
const loginSchema=zod.object({
    email:zod.string(),
    password:zod.string().min(6)
})
const updateSchema=zod.object({
  
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),

})

const router=Router();

router.post('/signup',async(req,res)=>{
    try {
        const {email,password,firstName,lastName}=req.body;
        const validatedData=SignupSchema.safeParse({email,password,firstName,lastName})
        if(!validatedData.success){
            return res.status(400).json({error:validatedData.error.errors})
        }
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({error:"User already exists"})
        }
        const hashedPassword=await hashPassword(password)
        const user=await User.create({email,password:hashedPassword,firstName,lastName})
        if(!user){
            return res.status(400).json("suer not created")
        }
        const token=generateToken(user)
        if(!token){
            return res.status(400).json("token not generated")
        }
        const balance=Math.floor((Math.random()*10000)+1)
        const account=await Account.create({userId:user._id,balance:balance})
        if(!account){
            return res.status(400).json("account not created")
        }

        return res.status(201).json({message:"User created successfully",token,account})

    } catch (error) {
        return res.status(400).json({error:error.message})
    }
})
router.post('/signin',async(req,res)=>{
    try {
        const{email,password}=req.body;
        const validatedData=loginSchema.safeParse({email,password})
        if(!validatedData.success){
            return res.status(400).json({error:validatedData.error.errors})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Invalid credentials"})
        }
        const isPasswordValid=await comparePassword(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({error:"Invalid credentials"})
        }
        const token=generateToken(user)
        return res.status(200).json({message:"Login successful",token})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }

})
router.put('/update',authMiddleware,async(req,res)=>{
    
    try {
        const {success}=updateSchema.safeParse(req.body)
        if(!success){
            return res.status(400).json({msg:"invalid credentials"})
        }
        await User.updateOne(
  { _id: req.userId },   // filter
  { $set: req.body }     // update
);

        return res.status(200).json({msg:"user details updated succefully"})
     
        
        
    } catch (error) {
        return res.status(400).json({error:error.message})
    }

    
})
router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or: [
                {
                    firstName: { $regex: filter, $options: "i" }
                },
                {
                    lastName: { $regex: filter, $options: "i" }
                }
            ]
        });

        return res.status(200).json({
            msg: "users fetched successfully",
            user: users.map(user => ({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user._id
            }))
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});





export default router;