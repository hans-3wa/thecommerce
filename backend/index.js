import express from 'express'
import mongoose from 'mongoose'
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import cors from "cors"
import {auth} from "./middleware/auth.js";
import userRouter from "./routes/userRouter.js";
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = 5300

app.use(cors())
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
console.log(process.env)
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_DB_URI)
    .then(init)
    .catch(err => console.log(err))

async function init() {
    app.use('/auth', authRouter)
    app.use('/admin',[auth.verifyToken, auth.isAdmin], adminRouter)
    app.use('/user',[auth.verifyToken, ], userRouter)
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhsot:${PORT}`)
})