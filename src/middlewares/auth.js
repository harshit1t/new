const jwt= require("jsonwebtoken")
const User=require("../model/user")
const userAuth=async(req,res,next)=>{
   try {
     //read the token from cookkie
    const cookies=req.cookies;
    const {token}=cookies;
    if (!token){
        throw new Error ("Token is not valid!!!")
    }
    const decode=jwt.verify(token,"Hars@tiwari");
    const {_id}=decode;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("User not found")
    };
    req.user=user;
    next();
    //validate the token
    //find the user
    
   } catch (err) {
    res.status(400).send("Error "+err.message);
    
   }
}
module.exports={

    userAuth
};