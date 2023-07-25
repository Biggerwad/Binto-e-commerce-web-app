import mongoose, { Schema } from "mongoose";

const itemsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        // required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
},
    { timestamps: true }
)

const Items = mongoose.model("Items", itemsSchema);

export default Items;