const mongoose = require('mongoose');
const Userschema = mongoose.Schema({
    name:String,
    otp:String,
    email:String,
    password:String,
    isPremium: { type: Boolean, default: false }, 
    emailVerify: { type: Boolean, default: false }, 
    // location:String,
    statusBar: {
        type: Number,
        enum: [0, 1], // 0: Deactive, 1: Active
        default: 1,
      },
    createdAt: { type: Date, default: Date.now } // ✅ Automatically sets the current date

})
const ModelUser = mongoose.model('user',Userschema)
module.exports=ModelUser;