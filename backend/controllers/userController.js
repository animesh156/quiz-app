const asyncHandler = require('express-async-handler')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

// Generate JWT

const generateToken = (res, userId) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    // stores token in HTTP-only cookie

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
}


// @desc Register a new uer
// @route POST /auth/register
// @access Public

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password,avatar} = req.body  

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please give required fields')
    }

    const userExits = await User.findOne({email})

    if(userExits){
        res.status(400)
        throw new Error('User already exist') 
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create(
        {
            name,
            email,
            password: hashedPassword,
            avatar
          
        }
    )
     
    if(user){
        generateToken(res, user._id);
        res.status(201).json(
            {
                _id: user.id,
                name: user.name,
                email:user.email,
                avatar:user.avatar,
               
            }
        )
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc Login a new uer
// @route POST /auth/login
// @access Public

const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
          generateToken(res, user._id)
        res.json({
            _id: user.id,
            name:user.name,
            email:user.email,
            avatar: user.avatar, 
            
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// logout user
const logoutUser = async (req,res) => {
    res.cookie("jwt", "", {httpOnly: true, expiress: new Date(0)})
    res.json({message: "Logged out successfully"})
}


// Check User Status
const getUserStatus = async (req,res) => {
    const user = await User.find(req.user._id).select("-password")
    if(user) {
        res.status(200).json(user)
    }
    else {
        res.status(404).json("User not found")
    }
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserStatus
}