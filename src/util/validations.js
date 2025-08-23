const validator = require("validator")
const validateSignupData=(req)=>{
    const {firstName,lastName,emailId,password}=req.params;
    if(!firstName||!lastName){
        throw new Error ("Name is not valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error ("Email is not valid")
    }
    else if (!validator.isStrongPassword(password)){

        throw new Error ("Weak Password")
    }

}
module.exports={validateSignupData};