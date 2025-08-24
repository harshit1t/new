const express = require("express");
const app = express();
const User=require("./model/user")
const dbConnect=require("./config/database")
const {validateSignupData}= require("./util/validations")
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser")
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)







dbConnect()
.then(()=>{
    console.log("Connected Successfully");
     app.listen(3000,()=>{
        console.log("Server is Running")
    }) ;
})
.catch((err)=>{
    console.log("error")
});
