const express = require("express");
const app = express();
const User=require("./model/user")
const dbConnect=require("./config/database")
const {validateSignupData}= require("./util/validations")
const bcrypt =require("bcrypt")
//const {adminAuth,userAuth} = require("./middlewares/auth")
//handle Auth middleware for all requests types/
//work for all the routes
app.use(express.json());
app.post("/signup",async(req,res)=>{
    

    try {
        //validation of data
   //validateSignupData(req);
        

    //Encryp the password
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
    
    
    //creating a new instance of user model
//    firstName:"Harshit",
//         lastName:"Tiwari",
//         emailID:"qwr@hmail.com"
//     }); const user=new User({
        
    // await user.save();
    // res.send("Success")
})
//Feed api -get all user from db
// app.get("/data/:userId",async (req,res)=>{
//     const useId=req.params?.userId;
//     // const userEmail=req.body.emailID;
//     try {
//         // const mkn=await User.find({emailId:userEmail});
//         const user = await User.find({userId})
//         res.send(user);
        
//     } catch (error) {
//         res.status(403).send("not found")
        
//     }
app.post("/login", async(req,res)=>{
    try {
        const {emailId,password}=req.body;

        const user =await  User.findOne({emailId:emailId})
        if (!user){
            throw new Error("Email is not in DB")
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if (isPasswordValid){
            res.send("login successfull");
        }
        else{
            throw new Error("Invalid Password")
        }

    } catch (err) {

        
        res.status(400).send("Error "+err.message);
        
    }

})

app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data= req.body;
    try{
        const AllowedUpdates=["about","gender","age","skill"]
        const isAllowedUpdates=Object.keys(data).every((k)=>AllowedUpdates.includes(k));
        if(!AllowedUpdates){
            throw new Error ("Updates Not Allowed");
        }
        const user=await User.findByIdAndUpdate({id_:UserId},data,{
            returnDocuments:"after",
            returnValidators:"true"
        });
        console.log(user);
        res.send("User updated successfully");
    }
    catch{
        res.status(402).send("cannot updated")
    }

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


   