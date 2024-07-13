 const mongoose=require("mongoose")

 const cabinSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"cabin must have name"],
        unique:true
    },
    maxCapacity:{
        type:Number,
        required:[true,"cabin must have maxCapicity"],
        minlength:1
    },
    price:{
        type:Number,
        required:[true,"cabin must have price"]
    },
    discount:{
        type:Number,
        default:0,
        validate:{
            validator:function(val){
                return this.price >val
            },
            message:"discount must be less than price"
        }
    },
    image:{
        type:String,
        required:[true,"cabin must have images"]
    },
    description:{
        type:String,
        required:[true,"cabin must have a description"],
        trim:true
    }

 },{
    timestamps:true
 })

 const cabinModel=mongoose.model("cabins",cabinSchema);


 module.exports=cabinModel
