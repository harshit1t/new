const express = require("express");
const profileRouter = express.Router();
const User=require("../model/user")
const {userAuth}=require("../middlewares/auth");
const {validateProfileEditData}=require("../util/validations")




profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try {
       
    const user = req.user
    
    res.send(user);

    } catch (err) {
        
        res.status(400).send("Error "+err.message);
    }
})
profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
    try {
       if (!validateProfileEditData(req)){
        throw new Error ("Cannot be edited")
       }
       const loggedInUser=req.user;
       Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
      await loggedInUser.save();
       res.json({message:`${loggedInUser.firstName} , your Profile updated successfully`,
        data:loggedInUser
       })
        
    } catch (err) {
         res.status(400).send("Error "+err.message);
        
    }
     
})
module.exports=profileRouter;