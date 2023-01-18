const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require ("cors");
const userRoute = require ("./routes/user_route.js");
const errorHandler = require("./middleware/error_middleware.js");
const cookieParser = require("cookie-parser");




const app = express();

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

//Routes Middleware
app.use("/api/users", userRoute);

//ROUTES
app.get("/", (req,res) =>{
    res.send("HOME PAGE");
})
//Erro midleware
app.use(errorHandler)
//Conection to mongo DB and start server
const PORT = process.env.PORT || 5000
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch((err)=>console.log(err));