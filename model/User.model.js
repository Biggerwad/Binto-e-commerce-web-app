import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 15,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
export default User;