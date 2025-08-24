const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../model/connectionRequest")


//list of all pending connection request of loggedIn user
userRouter.get("/user/request/received",userAuth,async(req,res)=>{
   
    try {
         const loggedInUser=req.user;
         const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
         }).populate("fromUserId",["firstName","lastName"])
         res.json({message:"data fetched",data:connectionRequests})
        
    } catch (err) {
         res.status(400).send("Error "+err.message);
        
    }

})
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try {
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[{toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ],

        }).populate("fromUserId",["firstName","lastName"]);
        const data =connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({message:"Connection found Successfuly",data})
        
    } catch (err) {
         res.status(400).send("Error "+err.message);
        
    }
})



module.exports=userRouter;