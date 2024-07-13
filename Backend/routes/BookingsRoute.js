const express=require("express")

const bookingsRoute=express.Router()
const {  getAllBookings,getBookingsById,postBookings,updateBookings,deleteBookings}=require("../controllers/BookingsController")

bookingsRoute.route("/").get(getAllBookings).post(postBookings)
bookingsRoute.route("/:id").get(getBookingsById).patch(updateBookings).delete(deleteBookings)

module.exports=bookingsRoute;