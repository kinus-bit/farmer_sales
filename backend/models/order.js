const mongoose = require("mongoose");

const orderSchema =  mongoose.Schema({
    //referencing user and product
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // required:[true,"user is required"],
        ref:"User"
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"Product"
    },
    productName:{
        type:String,
        required:[true ,"Name is required!!"]
    },
    productPrice:{
        type:Number,
        required:[true,"Price is required!!"]
    },
    quantity:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Order",orderSchema);