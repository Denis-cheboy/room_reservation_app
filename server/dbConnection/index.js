const mongoose=require("mongoose")
require("dotenv").config()

const connectDB=async(req,res,next)=>{
    try{
     await mongoose.connect(process.env.MONGO_DB_URL)
    }
    catch(err){
        next(err)
    }
}

module.exports=connectDB