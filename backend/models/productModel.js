import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug)

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
            slug: 'name',
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

export default mongoose.model('Product', productModel)