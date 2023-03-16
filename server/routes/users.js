const {Router}=require("express")
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/users")
const { verifyJWT, verifyUser, verifyAdmin } = require("../middlewares/verifyJWT")

const router=Router()

router.get("/",verifyJWT,verifyAdmin,getUsers)
router.get("/:id",verifyJWT,verifyUser,getUser)
router.put("/:id",verifyJWT,verifyUser,updateUser)
router.delete("/:id",verifyJWT,verifyUser,deleteUser)

module.exports=router