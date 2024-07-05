const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken")
const {UserModel, balanceModel } = require("../db/db");
const {authMiddleware} = require("../middleware.js")



const userSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password:zod.string().min(8, "password should be of 8 characters")
})


userRouter.post("/signup", async(req, res) => {
    const { success ,error } = userSchema.safeParse(req.body);
    if (!success) {
        return res.json({
            message : "email exists/ error"
        })
    }

    const user = await UserModel.findOne({
        username : req.body.username
    })


    if (user) {
        return res.json({
           message:"Email already exits/ input wrong"
       })
    }


    const dbUser = await UserModel.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId = dbUser._id;

    await balanceModel.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({userId},process.env.JWT_SECRET )
    res.json({
        message: "user created",
        token: token
    })




})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post("/login", async(req, res) => {

    const body = req.body;

   

    const user = UserModel.findOne({
        username: body.username,
        password:body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
    
    
})


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()

})

userRouter.put("/", authMiddleware, async (req, res) => {
    
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await UserModel.updateOne(req.body , { _id: req.userId });
   
    return res.json({message :"user updated"})
})


userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await UserModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        },{
               
            lastName: {
                "$regex":filter
            }
            
        }]
    })


    return res.json({

        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
                
        }))
    })


})


module.exports = userRouter;