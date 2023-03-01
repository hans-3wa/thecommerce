import mongoose from "mongoose";
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug)

const productModel = new mongoose.Schema({
        name: {
            type: String
        },
        description: {
            type: String,
        },
        images: [
            {
                type: String
            }
        ],
        quantity: {
            type: Number
        },
        price: {
            type: Number
        },
        slug: {
            type: String,
            slug: 'title',
            unique: true,
            index: true
        }
    }, {
        timestamps: true,
        versionKey: false
    }
)

export default mongoose.model('Product', productModel)