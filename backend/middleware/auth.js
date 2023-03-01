import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const verifyToken = (req, res, next) => {
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
            res.status(401).send({message: "Unauthorized!"});
            return
        }
        req.userId = decoded.id
        next()
    });
}

const isAdmin = (req, res, next) => {
    console.log(req.userId)
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