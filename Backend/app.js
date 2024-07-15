const express=require("express");

const app=express();

const AppError=require("./utils/AppError")

const morgan=require("morgan")

// routes
const userRoute=require("./routes/userRoute")
const cabinRoute=require("./routes/cabinRoute")
const bookingsRoute=require("./routes/BookingsRoute")
const guestRoute=require("./routes/guestRoute")


app.use(express.json())

if(process.env.NODE_ENV="development"){
    app.use(morgan("dev"))
}

// router middleware
app.use("/api/v1/user",userRoute)
app.use("/api/v1/cabins",cabinRoute)
app.use("/api/v1/bookings",bookingsRoute)
app.use("/api/v1/guest",guestRoute)

// page not found route
app.use("*",(req,res,next)=>{
 next(new AppError(`page not found for the request ${req.baseUrl} on this server`,404))
})

// error handling middleware
app.use((err,req,res,next)=>{
err.status=err.status||"fail";
err.statusCode=err.statusCode||500;
res.status(err.statusCode).json({
    status:err.status,
    message:err.message
})
})
module.exports=app;