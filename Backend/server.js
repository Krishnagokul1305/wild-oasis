const dotenv=require("dotenv")
dotenv.config({path:"./config.env"})
const app=require("./app");
const mongoose=require("mongoose")

const morgan=require("morgan")

if(process.env.NODE_ENV=="develpment"){
    app.use(morgan("dev"))
}

const port=process.env.PORT||3000

app.listen(port,()=>{
    console.log("listening")
})