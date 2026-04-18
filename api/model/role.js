const mongoose = require("mongoose");

const roleschema=mongoose.Schema({
    username: String,
    password:String ,
    email: String,
    permission:[String]

})
const role=mongoose.model('Admin',roleschema,'Admin')
module.exports=role;




