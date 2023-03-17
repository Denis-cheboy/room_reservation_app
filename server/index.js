const connectDB=require("./dbConnection")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const authRoute=require("./routes/auth")
const roomRoute=require("./routes/room")
const hotelRoute=require("./routes/hotel")
const errorHandler=require("./errorHandler")
const userRoute=require("./routes/users")

const mongoose=require("mongoose")
const express=require("express")

const PORT=process.env.PORT || 3500

// database connection
connectDB()

const app=express()

app.use(cors({
    origin:["https://room-reservation.onrender.com"]
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

// routes
app.use("/api/users",userRoute)
app.use("/api/hotels",hotelRoute)
app.use("/api/rooms",roomRoute)
app.use("/api/auth",authRoute)

// error handler
app.use(errorHandler)

mongoose.connection.once("connected",()=>{
    console.log("Connected to the database")
    app.listen(PORT,()=>console.log("Application running on port",PORT))
})

