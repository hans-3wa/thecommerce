import express from "express";
import {register, login, verifyToken} from "../controllers/authController.js";

const router = express.Router()

// http://localhost:5300/auth/register
router.post('/register', register)
router.post('/login', login)
router.get('/verify-token', verifyToken)

export default router