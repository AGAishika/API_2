const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    role: {
        type: String,
        default: "User",
    },
}, { timestamps: true });   
//   timestamps : jese data insert karenge to field provide krega 1.createdat, 2.updatedat
const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel
