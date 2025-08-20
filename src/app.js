const express = require("express");
const app = express();
const User=require("./model/user")
const dbConnect=require("./config/database")
//const {adminAuth,userAuth} = require("./middlewares/auth")
//handle Auth middleware for all requests types/
app.post("/signup",async(req,res)=>{
    
    //creating a new instance of user model
    const user=new User({
        firstName:"Harshit",
        lastName:"Tiwari",
        emailID:"qwr@hmail.com"
    });
    await user.save();
    res.send("Success")
})
dbConnect()
.then(()=>{
    console.log("Connected Successfully");
     app.listen(3000,()=>{
        console.log("firkjgkjgst")
    }) ;
})
.catch((err)=>{
    console.log("error")
});
// app.get("/user",(req,res)=>{
//     throw new console.error("jhfdhf");
    
//     res.send("User response is shown here")
// });
// app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(401).send("Error Occured")
//     }
// })


   