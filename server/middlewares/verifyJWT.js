const createError = require("../utils/createError")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const verifyJWT=async(req,res,next)=>{
    const accessToken=req.cookies?.jwt
    if(!accessToken) return next(createError(401,"Unauthorised Access"))
    try{
        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN,
            (err,decoded)=>{
               if(err) return next(createError(403,"Forbiden"))
               req.user=decoded
               next()
            }
        )

    }
    catch(err){
        next(err)
    }
}

const verifyUser=async(req,res,next)=>{
    try{
        if(req.user.isAdmin || req.user._id===req.params.id){
           next()
        }else{
            return next(createError(401,"Unathorised Operation"))
        }
    }
    catch(err){
        next(err)
    }
}
const verifyAdmin=async(req,res,next)=>{
    try{
        if(req.user.isAdmin){
           next()
        }else{
            return next(createError(401,"Unathorised Operation"))
        }
    }
    catch(err){
        next(err)
    }
}

module.exports={
    verifyAdmin,verifyJWT,verifyUser
}