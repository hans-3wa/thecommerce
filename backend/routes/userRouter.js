import express from "express";
import {getProductsByVisibility} from "../controllers/productController.js";
import {updateUser} from "../controllers/userController.js";

const router = express.Router()

router.get('/products', getProductsByVisibility)
router.put('/:id', updateUser)

export default router