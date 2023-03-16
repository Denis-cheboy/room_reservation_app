const mongoose=require("mongoose")

const RoomSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    title:{
        type:String
    },
    price:{
        type:Number
    },
    maxPeople:{
        type:Number
    },
    roomNumbers:[{roomNumber:Number,unavailableDates:[{type:Date}]}]
},{timestamps:true})

module.exports=mongoose.model("Room",RoomSchema)