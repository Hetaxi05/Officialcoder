const mongoose =require('mongoose')

const ContactSchema=mongoose.Schema({
    username:String,
    email:String,
    subject:String,
    message:String,
    adminReply: {type:String, default:""},
    isMessageSent:{type:Boolean, default:false}
});

const Contact=mongoose.model('contact',ContactSchema,'Contact')

module.exports=Contact;