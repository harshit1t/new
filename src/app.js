const express = require("express");
const app = express();

app.use("/hello",(req,res)=>{
    //request handler function
    res.send("hello from Server");
});
app.use("/harsh",(req,res)=>{
    res.send("hello  from dashboard")
});
app.use("/",(req,res)=>{
    res.send("khdhg");
});
    app.listen(3000,()=>{
        console.log("first")
    }) ;