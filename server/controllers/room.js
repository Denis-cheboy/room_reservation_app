const Hotel = require("../models/Hotel")
const Room=require("../models/Room")

const createRoom=async(req,res,next)=>{
    try{
        const newRoom= await Room.create(req.body)
        try{
          await Hotel.findByIdAndUpdate(req.params.id,{$push:{rooms:newRoom._id}},{new:true})
        }
        catch(err){
            next(err)
        }
        return res.status(200).json(newRoom)

    }
    catch(err){
        next(err)
    }
}

const deleteRoom=async(req,res,next)=>{
    try{
        await Room.findByIdAndDelete(req.params.roomId)
        try{
          await Hotel.findByIdAndUpdate(req.params.id,{$pull:{rooms:req.params.roomId}},{new:true})
        }
        catch(err){
            next(err)
        }
        return res.status(200).json("Successfully deleted the room")
    }
    catch(err){
        next(err)
    }
}

const getRoom=async(req,res,next)=>{
    try{
      const room= await Room.findById(req.params.id)
      return res.status(200).json(room)
    }
    catch(err){
        next(err)
    }
}

const getRooms=async(req,res,next)=>{
    try{
     const rooms=await Room.find()
     return res.status(200).json(rooms)
    }
    catch(err){
        next(err)
    }
}

const updateRoom=async(req,res,next)=>{
    try{
      const updatedRoom=await Room.findByIdAndUpdate(req.params.id,{$set:req.params.id},{new:true})
      return res.status(200).json(updatedRoom)
    }
    catch(err){
        next(err)
    }
}

const unavailableDates=async(req,res,next)=>{
    try{
      const availability=await Room.findOneAndUpdate({"roomNumbers._id":req.params.id},{$push:{'roomNumbers.$.unavailableDates':req.body.allDates}},{new:true})
      return res.status(200).json(availability)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    createRoom,getRoom,getRooms,deleteRoom,updateRoom,unavailableDates
}