const express = require("express")
const connection = require("./db/connect")
const userRoute = require("./routes/userRoute")
const verifierRoute = require("./routes/verifierRoute")
require("dotenv").config()

const app = express()
var cors = require('cors')
const issuerrouter = require("./routes/issuerRoute")
app.use(cors())

app.use(express.json())
app.use('/user', userRoute)
app.use('/issuer', issuerrouter)
app.get("/", (req, res) => {
    res.json({message : "Hello from the backend"})
})


app.listen(process.env.PORT, () => {
    try {
         connection;
         console.log(`Running on server ${process.env.PORT}`)
    } catch (error) {
        console.log(error);
        
    }
})