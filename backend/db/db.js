const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://bhavyakashmira:bhavya123@bhavya.sre367v.mongodb.net/?retryWrites=true&w=majority&appName=bhavya")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }

})






const balanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'UserModel',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const UserModel = mongoose.model("User", userSchema)
const balanceModel = mongoose.model("balance" ,balanceSchema)

module.exports = {UserModel, balanceModel};