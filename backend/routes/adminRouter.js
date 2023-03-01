import express from "express";
import {addProduct, getProducts} from "../controllers/productController.js";
import {auth} from "../middleware/auth.js";

const router = express.Router()

router.get('/products', getProducts)
router.post('/product', addProduct)

export default router