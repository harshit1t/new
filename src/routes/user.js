const express=require("express");
const userRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../model/connectionRequest")
const User=require("../model/user")
const USER_SAFE_DATA="firstName lastNmae age gender about skills photoUrl"


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
userRouter.get("/feed",userAuth,async(req,res)=>{
    const page=parseInt(req.query.page)||1;
    let limit=parseInt(req.query.limit)||10;
    limit=limit>50?50:limit;
    const skip=(page-1)*limit;
   

    try {
         //user should see all card except
    //his own
    //request sent
    //ignored people
    //his connections
    const loggedInUser=req.user;
    //find all connection request sent+received
    const connectionRequest=await ConnectionRequest.find({
        $or:[
            {fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}
        ]
    }).select("fromUserId toUserId");
    const hideUsersFromFeed=new Set();
    connectionRequest.forEach(req => {
        hideUsersFromFeed.add(req.fromUserId).toString(),
        hideUsersFromFeed.add(req.toUserId).toString()
        
    });
    const user=await User.find({
       $and: [{_id:{$nin:Array.from(hideUsersFromFeed)}},
        {_id:{$ne:loggedInUser._id}}
       ],
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    console.log(user);
    res.json(user);
        
    } catch (err) {
        res.status(400).send("Error "+err.message);
        
    }
})



module.exports=userRouter;