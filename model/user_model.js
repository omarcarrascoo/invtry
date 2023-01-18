const mongoose = require ("mongoose");
const { string } = require("yargs");
const bcrypt = require ("bcryptjs")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , "Please enter a valid email"]
        
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLenght: [8, "Password must be up to 8 characters"],

    },
    photo:{
        type: String,
        required: [true, "Please add a photo"],
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    phone:{
        type: String,
        default: "+52"
    },
    bio:{
        type: String,
        maxLenght: [250, "Maximun characters for bio are 250"],
        default: "Add your Bio",
    }
},{
    timestamps: true
})
// encryot password before saving to DB
 userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next()
    }
    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password=hashedPassword
    next();
 })

const User = mongoose.model("User", userSchema)

module.exports = User;
