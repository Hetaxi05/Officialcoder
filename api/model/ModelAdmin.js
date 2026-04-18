const mongoose = require('mongoose');
const Adminschema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const ModelAdmin = mongoose.model('admin',Adminschema)
module.exports=ModelAdmin;