const mongoose=require("mongoose")
const validator = require("validator")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken");
const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        min:4,
        max:12,
    },
    lastName:{
        type:String
    },
   age:{
    type:Number
   },
   emailId:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error ("Email is not valid")
        }
    }
   },
   password:{
    type:String,
    required:true,
   },
   gender:{
    type:String
   },
   about:{
    type:String
   },
   skills:{
    type:[String]
   },
   photoUrl:{
    type:String,
    default:"https://en.wikipedia.org/wiki/Flag_of_India",
    validate(value){
        if(!validator.isURL(value)){
            throw new Error("invalide Url "+ value)
            
        }
    }
   }
});
userSchema.methods.getJWT=async function (){
    const user = this;
    const token=await jwt.sign({_id:user._id},"Hars@tiwari",{expiresIn:"1h"})
    return token;

}
userSchema.methods.validatePassword=async function (password){
    const user =this;

    const isPasswordValid=await bcrypt.compare(password,this.password)
    return isPasswordValid;
}

const User=mongoose.model("User",userSchema);
module.exports=User;