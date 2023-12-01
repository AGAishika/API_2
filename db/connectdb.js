// Database creation require and call this function in app.js
const mongoose = require('mongoose')


const connectDB = () => {
    return mongoose.connect(process.env.LIVE_URL) // mongoose.connect hime return mai promise deta hai
    .then(() => {
        console.log('connected successfully')
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports = connectDB;