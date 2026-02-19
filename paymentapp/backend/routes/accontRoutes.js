import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import Account from "../models/account.model.js";
import mongoose from "mongoose";

const router=Router()


router.get('/getbalance',authMiddleware ,async(req,res)=>{
    try {
        const userId=req.userId
        const balance=await Account.findOne({userId})
        return res.status(200).json(balance)
    } catch (error) {
        return res.status(400).json(error)
    }

})
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { amount, to } = req.body;

        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                msg: "Insufficient balance or wrong account"
            });
        }

        const toAccount = await Account.findOne({
            userId: to
        }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                msg: "Wrong account"
            });
        }

        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        ).session(session);

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        ).session(session);

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            msg: "Transfer successful"
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
            error: error.message
        });
    }
});


export default router