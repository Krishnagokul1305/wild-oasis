const mongoose=require("mongoose")

const userSchema=mongoose.Schema({

},{
    timestamps:true,
})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel