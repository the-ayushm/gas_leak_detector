import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async (req, res) => {
    try{ 
    const {fullName, email, phone, sensorId , password, confirmPassword} = req.body 
    if(password !== confirmPassword){
        return res.status(400).json({
            error : "Password do not match!" 
        })
    }
    const user = await User.findOne({
        phone 
    })
    if(user){
        return res.status(400).json({
            error: "User already exists!"
        })
    }
    // HASH PASSWORD HERE 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        fullName,
        email,
        phone,
        sensorId,
        password: hashedPassword,
    })
    if(newUser){
        // GENERATE JWT TOKEN HERE
        await newUser.save()
        generateTokenAndSetCookie(newUser._id,res) 
        res.status(201).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            email : newUser.email,
            phone : newUser.phone,
            sensorId : newUser.sensorId, 
        })
    }else{
        res.status(400).json({
            error: "Invalid user data!"
        })
    }
    }catch(err){
        console.error(err)
        res.status(404).json({
            error: "Something went wrong!"
        })
    }
}

export const signin = async (req, res) => {
    try{
        const {email,phone, password} = req.body 
        const user = await User.findOne({
            email,phone 
        })
        const isPasswordMatch = await bcrypt.compare(password,user?.password || "") 
        if(!user || !isPasswordMatch){
            return res.status(400).json({
                error: "Invalid username or password!"
            })
        }
        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({
            message: "Logged in successfully!",
            _id : user._id,
            fullName : user.fullName,
            email : user.email,
            phone : user.phone
        })

    }catch(err){
        console.error(err)
        res.status(404).json({
            error: "Something went wrong!"
        })
    }
}
 
export const signout = (req, res) => {
    res.cookie("token", "" ,{maxAge: 0})
    res.status(200).json({
        message: "Logged out successfully!" 
    })
} 