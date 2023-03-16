const mongoose=require("mongoose")

const HotelSchema=new mongoose.Schema({
    distance:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        required:true
    },
    rooms:{
        type:[String]
    },
    title:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    cheapestPrice:{
        type:Number
    },
    rating:{
        type:Number,
        max:5,
        min:0
    },
    photos:{
        type:[String]
    }
},{timestamps:true})

module.exports=mongoose.model("Hotel",HotelSchema)