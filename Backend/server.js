const dotenv=require("dotenv")
dotenv.config({path:"./config.env"})
const app=require("./app");
const mongoose=require("mongoose")



mongoose.connect(`mongodb+srv://${process.env.DB_EMAIL}:${process.env.DB_PASSWORD}@app.m1lmn2d.mongodb.net/wild-oasis?retryWrites=true&w=majority&appName=app`)
    .then(() => {
        console.log("db connected");
    })
    .catch(err => console.log(err));

const port=process.env.PORT||3000

app.listen(port,()=>{
    console.log("listening")
})