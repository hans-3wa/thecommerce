import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: [true, 'This property Email is required'],
            match: /.+\@.+\..+/,
            unique: true,
            message: "Utilisateur déja existant"
        },
        password: {
            type: String,
            required: [true, 'This property Password is required']
        },
        isAdmin: {
            type: Boolean
        }
    }, {
        timestamps: true,
        versionKey: false
    }
)

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const message = `Le champ '${Object.keys(error.keyValue)[0]}' doit être unique.`;
        next(new Error(message));
    } else {
        next(error); // Passer l'erreur originale aux middleware suivants
    }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.methods.createJWT = function () {
    return jwt.sign({
        id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, {expiresIn: '24h'})
}

export default mongoose.model('User', userSchema)