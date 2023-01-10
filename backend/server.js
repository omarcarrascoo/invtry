const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require ("cors");


const app = express();

const PORT = process.env.PORT || 5000

//Conection to mongo DB and start server
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((err)=>console.log(err));