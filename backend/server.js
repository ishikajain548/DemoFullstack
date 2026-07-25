const express = require('express')
const app = express();
const cors= require('cors');
const cookieParser = require("cookie-parser");
require("dotenv").config();

const pool = require('./config/db')

const corsOptions = {
    origin: 'http://localhost:5173',
    optionSuccessStatus:200,
    credentials:true
}

app.use(cors(corsOptions));
//it will convert incoming data into json - middleware
app.use(express.json());

app.use(cookieParser());


// first data is converted to json then routes are matched so remember sequence
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")

app.use("/auth",authRoutes)
app.use("/userdata",userRoutes)



app.listen(3000,()=>{
    console.log('server is running');
    
})