import express from "express";
import {getProductsByVisibility} from "../controllers/productController.js";

const router = express.Router()

router.get('/products', getProductsByVisibility)

export default router