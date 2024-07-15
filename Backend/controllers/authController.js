const userModel=require("../models/userModel")
const jwt=require("jsonwebtoken")

function createJwtToken(id){
    return jwt.sign(id,process.env.JWT_SECRET_STRING,{
        expiresIn:process.env.JWT_TOKEN_EXPIRES
    })
}

const signin=(req,res,next)=>{}
const login=(req,res,next)=>{}
const restricto=(req,res,next)=>{}
const protect=(req,res,next)=>{}
const forgotPassword=(req,res,next)=>{}
const resetPassword=(req,res,next)=>{}
const updatePassword=(req,res,next)=>{}

module.exports={signin,login,resetPassword,restricto,protect,forgotPassword,updatePassword}
