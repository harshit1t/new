const express = require("express");
const authRouter = express.Router();
const User=require("../model/user")
const {validateSignupData}= require("../util/validations")
const bcrypt =require("bcrypt")







authRouter.post("/signup",async(req,res)=>{
    

    try {
        //validation of data
   validateSignupData(req);
        

    //Encrypt the password
    const {firstName,lastName,emailId,password}=req.body;
    const passwordHash=await bcrypt.hash(password,10);
    // console.log(passwordHash)


    // Adding to database
    const user=new User({
        firstName,lastName,emailId,password:passwordHash
    })
        user.save();
        res.send("data sent")
        
    } catch (err) {
        res.status(400).send("Error "+err.message);
        
    }
    
  
})


authRouter.post("/login", async(req,res)=>{
    try {
        const {emailId,password}=req.body;

        const user =await  User.findOne({emailId:emailId})
        if (!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid=await user.validatePassword(password)
        if (isPasswordValid){
            //create a jwt token
            const token = await user.getJWT();
            //add the token to cookie and send to user with the response
            console.log(token);
            res.cookie("token",token,{expires:new Date(Date.now()+2*36000000)});
            res.send("login successfull");
        }
        else{
            throw new Error("Invalid Password")
        }

    } catch (err) {

        
        res.status(400).send("Error "+err.message);
        
    }

})





module.exports=authRouter;