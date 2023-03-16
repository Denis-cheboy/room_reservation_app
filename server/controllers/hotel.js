const Hotel=require("../models/Hotel")
const Room=require("../models/Room")

const createHotel=async(req,res,next)=>{
    try{ 
        const newHotel=await Hotel.create(req.body)
        return res.status(201).json(newHotel)

    }
    catch(err){
        next(err)
    }
}

const deleteHotel=async(req,res,next)=>{
    try{
      await Hotel.findByIdAndDelete(req.params.id)
      return res.status(200).json("Successfully deleted the hotel")
    }
    catch(err){
        next(err)
    }
}

const updateHotel=async(req,res,next)=>{
    try{
      const updatedHotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      return res.status(200).json(updatedHotel)
    }
    catch(err){
        next(err )
    }
}

const getHotel=async(req,res,next)=>{
    try{
      const hotel=await Hotel.findById(req.params.id)
      return res.status(200).json(hotel)
    }
    catch(err){
        next(err)
    }
}

const getHotels=async(req,res,next)=>{
    const {min,max,...others}=req.query
    try{
      const hotels=await Hotel.find({...others,cheapestPrice:{$gt:min || 0,$lt:max || 1000}}).limit(req.query.limit)
      return res.status(200).json(hotels)
    }
    catch(err){
    }
}

const countByCity=async(req,res,next)=>{
    const cities=req.query.cities.split(",")
    
    try{
        const cityList=await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        return res.status(200).json(cityList)
    }
    catch(err){
        next(err)
    }
}

const countByType=async(req,res,next)=>{
    try{
        const hotelType=await Hotel.countDocuments({type:/Hotel/i})
        const resortType=await Hotel.countDocuments({type:/Resort/i})
        const villaType=await Hotel.countDocuments({type:/Villa/i})
        const cabinType=await Hotel.countDocuments({type:/cabin/i})
        const apartmentType=await Hotel.countDocuments({type:/Apartment/i})

        return res.status(200).json([
            {type:"Hotels",count:hotelType},
            {type:"Resorts",count:resortType},
            {type:"Villas",count:villaType},
            {type:'Apartments',count:apartmentType},
            {type:"Cabins",count:cabinType}
        ])
       
    }
    catch(err){
        next(err)
    }
}

const getHotelRooms=async(req,res,next)=>{

    try{
       const hotel=await Hotel.findById(req.params.id)
       const list=await Promise.all(hotel.rooms.map(room=>{
        return Room.findById(room)
       }))
       return res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    getHotel,getHotels,updateHotel,deleteHotel,countByCity,countByType,createHotel,getHotelRooms
}