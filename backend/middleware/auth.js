import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const verifyToken = (req, res, next) => {
    let token;
    if (req.headers['authorization'] !== undefined) {
        token = req.headers['authorization'].split(' ')[1]
    }
    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).send({message: "Unauthorized!"});
        }
        req.userId = decoded.id
        next()
    });
}

const isAdmin = (req, res, next) => {
    UserModel.findOne({_id: req.userId})
        .then((user) => {
            if(user.isAdmin){
                next()
            } else {
                return res.status(401).send({message: "Unauthorized!"});
            }
        })
        .catch((err) => res.status(401).send({message: "Unauthorized!"}))
}

export const auth = {
    verifyToken,
    isAdmin
}