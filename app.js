const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path: './.env'});
const web = require('./routes/web');
const connectDB = require('./db/connectdb');
// // image upload code 
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cors()) //for api communication in react
app.use(cookieParser()) // for getting token in auth 

// image jab upload krte hai to usko temporary file mai upload krrte hai  fr uske 
// baad use upload folder mai dalte hai 
app.use(fileUpload({useTempFiles: true})); 

// for data get in api when posting data from api under postman
app.use(express.json())

connectDB();
app.use('/api', web);


app.listen(process.env.PORT, () => {
    console.log(`server connected successfully with localhost: ${process.env.PORT}`)
})