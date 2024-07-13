const mongoose=require("mongoose")

const bookingSchema=mongoose.Schema({

},{
    timestamps:true,
})

const bookingModel=mongoose.model("bookings",bookingSchema)

module.exports=bookingModel