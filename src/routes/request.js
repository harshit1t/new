const express= require("express");
const requestRouter= express.Router();
const User=require("../model/user")
const {userAuth}=require("../middlewares/auth")






requestRouter.post("/send",userAuth,async(req,res)=>{
    const user=req.user;

    res.send(user.firstName+" sends the request");
})
module.exports=requestRouter;