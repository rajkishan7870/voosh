const express = require('express');
const cors = require("cors");


const connectDB = require('../db/conn')
const userRouter = require("../routes/user");
const interactionRouter = require("../routes/interaction")
const {checkAuthForProfile} = require("../middlewares/auth")
port = 5000

const app = express();
connectDB()

// Middleware Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/api/user", userRouter)
app.use("/api/interaction", checkAuthForProfile, interactionRouter)

app.listen(port, ()=>{
    console.log(`Connection setup at ${port}`)
})