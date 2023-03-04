import ProductModel from "../models/productModel.js";
import formidable from "formidable";
import fs from 'fs'

import {copyFiles} from "../utils/utils.js";

export const getProducts = (req, res) => {
    ProductModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}

export const addProduct = (req, res) => {
    try {
        const form = formidable({multiples: true});
        form.parse(req, async (err, fields, files) => {

            if (err) throw new Error(err.message)
            const images = await copyFiles(files.image ?? [], 'public/img')

            ProductModel.create({
                name: fields.name,
                description: fields.description,
                quantity: fields.quantity,
                price: fields.price,
                images
            })
                .then((product) => res.status(201).json({message: "Creation product successful", product}))
                .catch((err) => res.status(400).json({error: err.message}))
        });
    } catch (e) {
        res.status(400).json(e)
    }
}

export const updateProduct = (req, res) => {
    try {
        const form = formidable({multiples: true});
        form.parse(req, async (err, fields, files) => {
            const product = await ProductModel.findById(fields.id)

            const images = product.images.filter((e) => !fields['deleteImages'].includes(e))
            const newImages = await copyFiles(files.images ?? [], 'public/img')

            !fields['deleteImages'].forEach((e) => {
                fs.unlink(e, (err) => {
                    if (err) {
                        if (err.code !== 'ENOENT') {
                            return res.status(500).json(e)
                        }
                    }
                });
            })

            images.push(...newImages)


            ProductModel.findByIdAndUpdate(fields.id, {
                name: fields.name,
                description: fields.description,
                quantity: fields.quantity,
                price: fields.price,
                images
            }, {new: true})
                .then((data) => res.status(201).json({message: "Update product successful", data}))
                .catch((err) => res.status(400).json({error: err.message}))


        })
    } catch (e) {
        res.status(400).json(e)
    }
}

export const deleteProductId = (req, res) => {

    try {
        const {id} = req.body
        ProductModel.findOneAndDelete({_id: id}, (err, deleted) => {
            if (err) {
                return res.status(500).json({message: 'Error during deletion'});
            }
            if (!deleted) {
                return res.status(404).json({message: 'Element not found'});
            }
            deleted.images.forEach((image, i) => {
                fs.unlink(image, (err) => {
                    if (err) throw err;
                });
            })

            return res.status(204).send();
        })
    } catch (e) {
        return res.status(500).json({message: 'Error during deletion'});
    }
}

export const deleteAllProducts = (req, res) => {

    ProductModel.deleteMany()
        .then((data) => res.status(204).send())
        .catch(() => res.status(500).json({message: 'Error during deletion'}))
}
