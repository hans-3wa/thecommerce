import mongoose from "mongoose";
import {slugify} from "../utils/utils.js";

const productModel = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        images: [
            {
                type: String,
                required: true
            }
        ],
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },
        status: {
            type: Boolean,
            required: true
        }

    }, {
        timestamps: true,
        versionKey: false
    }
)
productModel.pre('save', async function (next) {
    this.slug = slugify(this.name)
    next()
})
export default mongoose.model('Product', productModel)