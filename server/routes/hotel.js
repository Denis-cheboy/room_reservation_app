const {Router}=require("express")
const { createHotel, getHotels, getHotel, updateHotel, deleteHotel, countByCity, countByType, getHotelRooms } = require("../controllers/hotel")

const router=Router()

router.post("/",createHotel)
router.get("/",getHotels)
router.get("/:id",getHotel)
router.put("/:id",updateHotel)
router.delete("/:id",deleteHotel)

router.get("/count/countByCity",countByCity)
router.get("/type/countByType",countByType)
router.get("/list/rooms/:id",getHotelRooms)

module.exports=router