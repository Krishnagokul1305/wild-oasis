const mongoose=require("mongoose")

const guestSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:[true,"guest must have name"],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,"guest must have an email id"]
    },
    nationality:{
        type:String,
        required:[true,"guest must have nationality"]
    },
    nationalId:{
        type:String,
        required:[true,"guest must have national id"]
    },
    countryFlag:{
        type:String,
        required:[true,"guest must have a country flag id"]
    }
},{
    timestamps:true,
})

const guestModel=mongoose.model("guests",guestSchema)

module.exports=guestModel