const express = require('express')
const app = express()
const DatabaseConnect = require('./config/db')
const AuthRouter = require("./routes/auth-routes")
const hissabRouter = require('./routes/index-routes')
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT || 3000
DatabaseConnect()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow necessary HTTP methods

}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/auth",AuthRouter)
app.use("/hissab", hissabRouter)

app.get("/",(req,res)=>{
    res.send("hello this is your first page")
})

app.listen(port,() => {
    console.log(`Listening on ${port}`)
})
