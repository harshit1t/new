const express = require("express");
const app = express();
//const {adminAuth,userAuth} = require("./middlewares/auth")
//handle Auth middleware for all requests types

app.get("/user",(req,res)=>{
    throw new console.error("jhfdhf");
    
    res.send("User response is shown here")
});
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(401).send("Error Occured")
    }
})


    app.listen(3000,()=>{
        console.log("firkjgkjgst")
    }) ;