const express=require("express")

const userRoute=express.Router()

userRoute.route("/").get(function(req,res,next){
    res.status(200).json({
        status:"successfully userroute worked"
    })
})

module.exports=userRoute;