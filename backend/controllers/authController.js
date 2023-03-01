import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const register = async (req, res) => {

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
                let jwt = user.createJWT()
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
    if (req.headers['authorization'] !== undefined) {
        token = req.headers['authorization'].split(' ')[1]
    }
    if (!token) {
        res.status(403).send({message: "No token provided!"});
        return
    }

    jwt.verify(token, "key_secret", async (err, decoded) => {
        if (err) {
            res.status(403).send({message: "Unauthorized!"});
            return
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