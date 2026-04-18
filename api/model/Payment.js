const mongoose=require("mongoose")


const paymentschema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, 
    plan: { type: String },       // Plan Name (e.g., Annual, Lifetime)
    price: { type: Number },      // Plan price
    currency: { type: String }, 
    transactionId: { type: String }, // PayPal transaction ID
    status: { type: String, enum: ["pending", "approved", "failed"], default: "pending" }, 
    createdAt: { type: Date, default: Date.now }
});


const Payment = mongoose.model('Payment', paymentschema, "Payment");
module.exports = Payment;










// const paymentschema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
//     plan: { type: String, required: true },       
//     price: { type: Number, required: true },      
//     currency: { type: String, required: true }, 
//     transactionId: { type: String, unique: true, required: true }, 
//     status: { type: String, enum: ["pending", "approved", "failed"], default: "pending" }, 
//     createdAt: { type: Date, default: Date.now }
// });
