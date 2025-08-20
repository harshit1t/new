const express = require("express");
const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth")
//handle Auth middleware for all requests types
app.use("/admin",adminAuth)
// app.use("/user",userAuth)
app.get("/admin/data",(req,res)=>{
    
   res.send("All user data")
});
app.get("/user/delete",userAuth,(req,res)=>{
    res.send("User response is showm here")
})


    app.listen(3000,()=>{
        console.log("first")
    }) ;