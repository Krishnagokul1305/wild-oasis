const cabinModel=require("../models/cabinModel")
const catchAsync=require("../utils/asyncErrorHandler")
const AppError=require("../utils/AppError")
const ApiFeatures=require("../utils/ApiFeatures")
//   function to get all cabins user must be logged in to access these routes
const getAllCabin=catchAsync(async(req,res,next)=>{
    const query=req.query
    console.log(query)
 const features=new ApiFeatures(cabinModel.find(),query).filter()
 console.log(await features.query)
const cabins=await cabinModel.find();
res.status(200).json({
    status:"success",
    results:cabins.length,
    data:cabins
})
})

//   function to get cabin by id 
const getCabinByName=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const cabin=await cabinModel.findById({_id:id})
    res.status(200).json({
        status:"success",
        data:cabin
    })
})

// function to post cabins
const postCabin=catchAsync(async(req,res,next)=>{
    const { name,maxCapacity,price,image,description, discount = 0}=req.body;
    if(!name||!maxCapacity||!price||!image||!description){
        return next(new AppError("Please fill all the fields"))
    }
    const cabin=await cabinModel.create({
        name,maxCapacity,price,image,description,discount
    });
    res.status(201).json({
        status:"success",
        data:cabin
    })
})

// function to update the cabin by id
const updateCabin=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const newCabin=await cabinModel.findByIdAndUpdate(id,req.body,{
        runValidators:true,
        new:true
    })
    res.status(201).json({
        status:"success",
        data:newCabin
    })
})

// function to delete cabin
const deleteCabin=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    await cabinModel.findByIdAndDelete(id)
    res.status(204).json({
        status:"no content"
    })
})

module.exports={
    getAllCabin,getCabinByName,postCabin,updateCabin,deleteCabin
}