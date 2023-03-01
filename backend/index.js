import express from 'express'
import mongoose from 'mongoose'
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import cors from "cors"
import {auth} from "./middleware/auth.js";

const app = express()
const PORT = 5300

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.set("strictQuery", false)
mongoose.connect('mongodb://localhost:27017/ANJS01thecommerce')
    .then(init);

async function init() {
    app.use('/auth', authRouter)
    app.use('/admin',[auth.verifyToken, auth.isAdmin], adminRouter)
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhsot:${PORT}`)
})