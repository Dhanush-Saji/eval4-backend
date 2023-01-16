const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require('dotenv').config()
const {connection} = require('./config/db')
const { userRouter } = require("./routes/user")
const { postRouter } = require("./routes/post")

const PORT = process.env.PORT
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Home page")
})
app.use('/users',userRouter)
app.use('/posts',postRouter)

app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening on http://localhost:${PORT}`);
})