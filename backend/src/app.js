const express = require('express');
const cors = require("cors");


const connectDB = require('../db/conn')
port = 5000

const app = express();
connectDB()

// Middleware Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.listen(port, ()=>{
    console.log(`Connection setup at ${port}`)
})