import ProductModel from "../models/productModel.js";
import formidable from "formidable";
import fs from 'fs'

import {copyFiles} from "../utils/utils.js";

export const getProducts = (req, res) => {
    ProductModel.find()
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((err) => res.status(400).json({error: "An error occured"}))
}

export const getProductSlug = (req, res) => {
    const {slug} = req.params
    if (!slug) {
        return res.status(400).json({error: "Bad request"})
    }
    ProductModel.findOne({slug})
        .then((product) => res.status(200).json(product))
        .catch((err) => res.status(400).json(err))
}

export const addProduct = (req, res) => {
    try {
        const form = formidable({multiples: true});
        form.parse(req, async (err, fields, files) => {

            if (err) return res.status(500).json(e.message)

            const images = await copyFiles(files.image ?? [], 'img/products')

            const product = new ProductModel({
                name: fields.name,
                description: fields.description,
                quantity: fields.quantity,
                price: fields.price,
                status: fields.status,
                images
            })

            product.save()
                .then((product) => res.status(201).json({message: "Creation products successful", product}))
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

            if (!product) {
                return res.status(400).json({error: "Id undifined"})
            }

            // récupère les anciennes images qu'on filtre avec celles qu'ont veut supprimer. ( deleteImages )
            const images = product.images.filter((e) => !fields.deleteImages?.includes(e))
            // Suppression de celle que l'on veut plus
            if (fields.deleteImages) {
                fields.deleteImages.forEach((e) => {
                    fs.unlink(e, (err) => {
                        if (err) {
                            if (err.code !== 'ENOENT') {
                                return res.status(500).json(e)
                            }
                        }
                    });
                })
            }

            // récupéré les nouvelles images que veux mette l'utilisateur ( files === images )
            const newImages = await copyFiles(files.images ?? [], 'img/products')


            images.push(...newImages)
            ProductModel.findByIdAndUpdate(fields.id, {
                name: fields.name,
                description: fields.description,
                quantity: fields.quantity,
                price: fields.price,
                status: fields.status,
                images
            }, {new: true})
                .then((product) => res.status(201).json({message: "Update products successful", product}))
                .catch((err) => res.status(400).json({error: err.message}))


        })
    } catch (e) {
        res.status(400).json(e)
    }
}

export const deleteProductId = (req, res) => {
    try {
        const {id} = req.params
        ProductModel.findOneAndDelete({_id: id}, (err, deleted) => {
            if (err) {
                return res.status(500).json({message: 'Error during deletion'});
            }
            if (!deleted) {
                return res.status(404).json({message: 'Element not found'});
            }

            deleted.images.forEach((image, i) => {
                fs.unlink(`public/${image}`, (err) => {
                    if (err) return res.status(500).json({error: "File doesn't no existing"})
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
        .then((data) => {
            fs.readdir('public/img/products', (err, files) => {
                if (err) return res.status(500).json({error: "An error occured"});

                for (const file of files) {
                    if (file !== '.gitignore') {
                        fs.unlink(`public/img/products/${file}`, err => {
                            if (err) {
                                return res.status(500).json({message: 'Error during deletion'})
                            }
                        });
                    }

                }
            });
            res.status(204).send()
        })
        .catch(() => res.status(500).json({message: 'Error during deletion'}))

}

export const getProductsByVisibility = (req, res) => {
    ProductModel.find({status: true})
        .then((products) => res.status(200).json({count: products.length, products}))
        .catch((products) => res.status(400).json({error: "An error is occurring"}))
}

export const getProductBySlug = (req, res) => {
    const {slug} = req.params
    ProductModel.findOne({slug: slug})
        .then((product) => {
            if(!product){
                return res.status(400).json({message: "This slug is not supplied with a product"})
            }
            return res.status(200).json({product})
        })
        .catch((err) => res.status(500).json({err}))
}