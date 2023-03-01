import mongoose from "mongoose";

const cart = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            }
        ]
    }, {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('Cart', cart)