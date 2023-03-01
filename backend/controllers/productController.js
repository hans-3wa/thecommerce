import ProductModel from "../models/productModel.js";
import formidable from "formidable";

export const getProducts = (req, res) => {
    res.send({message: 'products'})
}

export const addProduct = async (req, res) => {
    const form = formidable();
    try {
        form.parse(req, (err, fields, files) => {
            console.log(fields, files)
        })
    } catch (e) {
    }
}