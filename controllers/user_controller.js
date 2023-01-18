const asyncHandler = require("express-async-handler")
const User = require("../model/user_model")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})

}

//-------------------------------------REGISTER----------------------------
const registerUser = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body
    //VALIDATION
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill in all required fields")
    }
    if(password.length < 8) {
        res.status(400)
        throw new Error("Password must be up to 8 characters")
    }
    //Check if user email already exist
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error("Email has already been registered")
    }


    //Create new user
    const user = await User.create({
        name,
        email,
        password
    })
    //Generate token
    const token = generateToken(user._id)

    //Send http-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true
    })

    if(user){
        const {_id, name, email, photo, phone, bio} = user
        res.status(201).json({
            _id, name, email, photo, phone, bio,token,
        })
    }else {
        res.status(400)
        throw new Error("Invalid user data")
    }

});
    
//-------------------------------------LOGIN----------------------------
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    //Validate request
    if(!email || !password){
        res.status(400)
        throw new Error("Please add an email and password")
    }
    //Check if user exist
    const user = await User.findOne({email})

    if(!user){
        res.status(400)
        throw new Error("User not found, please signup")
    }
    //User exists, check if password is correct
    
    if(!user){
        res.status(400)
        throw new Error("User not found, please signup")
    }
    
}) 
module.exports = {
    registerUser,
    loginUser,
}