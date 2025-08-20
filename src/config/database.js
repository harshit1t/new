const mongoose = require('mongoose')
const dbConnect =async ()=>{
    await mongoose.connect("mongodb+srv://harshit27062002:H9J9iFz9mvrBwjKI@cluster0.khc82ot.mongodb.net/harsh");

}
module.exports=dbConnect;