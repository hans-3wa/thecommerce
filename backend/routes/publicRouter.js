import express from "express";
import {getProductBySlug, getProductsByVisibility} from "../controllers/productController.js";

const router = express.Router()

router.get('/products', getProductsByVisibility)
router.get('/product/:slug', getProductBySlug)

export default router