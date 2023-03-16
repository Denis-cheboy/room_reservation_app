const {Router}=require("express")
const { getRooms, createRoom, getRoom, updateRoom, deleteRoom, unavailableDates } = require("../controllers/room")

const router=Router()

router.get("/",getRooms)
router.post("/:id",createRoom)
router.get("/:id",getRoom)
router.put("/:id",updateRoom)
router.delete("/:roomId/:id",deleteRoom)

router.put("/availability/:id",unavailableDates)

module.exports=router