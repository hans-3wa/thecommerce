import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const register = async (req, res) => {
    console.log('ok')
    const {email, password} = req.body

    userModel.create({
        email,
        password,
        isAdmin: false
    })
        .then((user) => {
            const jwt = user.createJWT()
            res.status(200).json({
                user: {
                    email: user.email,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt
                }
                , jwt
            })
        })
        .catch((e) => {
            res.status(400).json({error: e.message})
        })
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        user.comparePassword(password, async (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const jwt = user.createJWT()
                res.status(200).json({
                    message: "Login successfull",
                    user: {
                        id: user._id,
                        email: user.email,
                        isAdmin: user.isAdmin
                    },
                    jwt
                })
            } else {
                res.status(400).json({message: "User no found"})
            }
        });
    } catch (e) {
        res.status(400).json({message: "User no found"})
    }
}

export const verifyToken = async (req, res) => {

    let token;
    if (
        req.headers['authorization'] !== undefined) {
        token = req.headers['authorization'].split(' ')[1]
    }
    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).send({message: "Unauthorized!"});
        }
        const user = await UserModel.findOne({_id: decoded.id})
        res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })
    });
}