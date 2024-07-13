const express=require("express")

const bookingsRoute=express.Router()

bookingsRoute.route("/").get(function(req,res,next){
    res.status(200).json({
        status:"successfully bookingsroute worked"
    })
})

module.exports=bookingsRoute;