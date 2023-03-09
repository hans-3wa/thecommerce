import UserModel from "../models/userModel.js";

export const updateUser = async(req, res) => {
    const {id} = req.params

    const user = await UserModel.findOne({_id:id})
    if(!user){
        return res.status(400).json({error: "User is undefined"})
    }
    Object.keys(req.body).forEach((e) => {
        user[e] = req.body[e]
    })

    user.save()
        .then((user) => res.status(202).json({user}))
        .catch((err) => res.status(400).json({error: err}))

}