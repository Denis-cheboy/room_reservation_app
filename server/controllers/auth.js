const User=require("../models/User")

const jwt=require("jsonwebtoken")
require("dotenv").config()

const createError = require("../utils/createError")
const { registerValidation, loginValidation } = require("../utils/inputValidations")
const { hash, comparePassword } = require("../utils/passwordHashing")

const register=async(req,res,next)=>{
    try{
     const {error}=registerValidation(req.body)
     if(error) return next(createError(400,error.details[0].message))
     const {username,email,password}=req.body
     const hashPassword=await hash(password)
     const newUser=await User.create({
        username:username,
        email:email,
        password:hashPassword
     })
     return res.status(201).json(newUser)
    }
    catch(err){
        next(err)
    }
}

const login=async(req,res,next)=>{
    try{
      const {error}=loginValidation(req.body)
      if(error) return createError(400,error.details[0].message)
      const {password,email}=req.body
      const foundUser= await User.findOne({email:email})
      if(!foundUser) return next(createError(400,"User does not exists"))
      const comparePasswords=await comparePassword(foundUser.password,password)
      if(!comparePasswords) return next(createError(400,"Wrong email or password"))
      const accessToken=jwt.sign({userId:foundUser._id,isAdmin:foundUser.isAdmin},process.env.ACCESS_TOKEN,{expiresIn:"30000s"})

      return res.cookie("jwt",accessToken,{maxAge:24*60*60*1000,httpOnly:true}).status(200).json(foundUser)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    register,login
}