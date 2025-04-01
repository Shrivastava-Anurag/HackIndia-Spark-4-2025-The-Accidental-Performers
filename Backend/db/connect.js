const mongoose = require("mongoose")
require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI 

mongoose.connect(MONGODB_URI).then(()=>{
    console.log("DATABASE CONNECTED")
}).catch((err) =>{
    console.log("error", err)
})