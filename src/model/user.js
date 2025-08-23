const mongoose=require("mongoose")
const validator = require("validator")
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
   }
});
const User=mongoose.model("User",userSchema);
module.exports=User;