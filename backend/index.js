import express from 'express'
import mongoose from 'mongoose'
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import cors from "cors"
import {auth} from "./middleware/auth.js";
import userRouter from "./routes/userRouter.js";
import * as dotenv from 'dotenv'
import publicRouter from "./routes/publicRouter.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5200

app.use(cors())
app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(init)
    .catch(err => {
        console.log(err.message)
    })

async function init() {
    console.log('Connexion établie')
    app.use('/', publicRouter)
    app.use('/auth', authRouter)
    app.use('/admin', [auth.verifyToken, auth.isAdmin], adminRouter)
    app.use('/user', [auth.verifyToken,], userRouter)
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhsot:${PORT}`)
})