const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  //foreign key
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  productUrl: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
},{
    timestamps:true,
});

module.exports = mongoose.model("Product", productSchema);
