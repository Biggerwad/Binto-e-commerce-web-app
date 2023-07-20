import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
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
    cart: {
        items: [
            {
                itemId: {
                    type: Schema.Types.ObjectId,
                    ref: "Items", required: true,
                },
                itemQty: {
                    type: Number,
                    required: true,
                },
            }
        ]
    },
    online: {
        type: Boolean,
        default: false,
        required: true,
    }
},
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
export default User;
