import express from "express";
import {
    addProduct, deleteAllProducts,
    deleteProductId,
    getProducts,
    updateProduct
} from "../controllers/productController.js";
import {auth} from "../middleware/auth.js";

const router = express.Router()

router.get('/products', getProducts)
router.post('/product', addProduct)
router.put('/product', updateProduct)
router.delete('/product/:id', deleteProductId)
router.delete('/products', deleteAllProducts)

export default router