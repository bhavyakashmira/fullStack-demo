const express = require("express");
const accountRouter = express.Router();
const mongoose = require("mongoose");
const zod = require("zod");
const jwt = require("jsonwebtoken")
const { UserModel, balanceModel } = require("../db/db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware.js");




accountRouter.get("/balance",authMiddleware , (req  , res) => {
        
    const account = balanceModel.findOne({
        userId:req.userId
    })
    res.json({
        balance: account.balance
    })
})


accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    const { amount, to } = req.body;
    const account = await balanceModel.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.json({
            message: "Insufficient balance"
        });
    }

    const toaccount =await  balanceModel.findOne({ userId: to }).session(session);

    if (!toaccount) {
        await session.abortTransaction();
        return res.json({
            message :"no such user"
        })
    }


    await balanceModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await balanceModel.updateOne({userId: to},{$inc: {balance : amount}}).session(session)




    await session.commitTransaction();
    
    res.json({
        message:"transfer successful"
    })
    
})





module.exports = accountRouter;

