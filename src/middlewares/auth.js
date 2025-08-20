const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isTrue=token==="xyz";
    if(!isTrue){
        res.status(401).send("Unauthorizes access")
    }
    else{
        next();
    }
};
const userAuth=(req,res,next)=>{
    const token="xyz";
    const isTrue=token==="xyz";
    if(!isTrue){
        res.status(401).send("Unauthorizes access")
    }
    else{
        next();
    }
};
module.exports={
    adminAuth,
    userAuth
};