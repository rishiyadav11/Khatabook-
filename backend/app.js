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

const corsOptions = {
  origin: 'https://khatabook-teal.vercel.app', // Correct origin without trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

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
