const mongoose=require("mongoose");
const connectionRequestschema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//reference to user collection
        require:true,
    },
    toUserId:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Users",
          require:true,
    },
    status:{
        type:String,
        enum:{
            values:["interested","accepted","rejected","ignore"],
            message:`{value} is incorrect status type`,
        },
         require:true,
    },
   


}, {timestamps:true});
//compound index
connectionRequestschema.index({fromUserId:1,toUserId:1})
connectionRequestschema.pre("save",function(next){
    const connectionRequest=this;
    //check if fromUserId is sam as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error (" cannot send request to yourself")
    }
    next();
})
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestschema);
module.exports=ConnectionRequestModel;