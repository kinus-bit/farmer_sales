const Order = require("../models/order");
const Product = require("../models/Product");
const User = require("../models/user");
//creating an order
exports.createOrder = async (req, res) => {
  try {
    //data from user
    const { productId, productName, productPrice, quantity } = req.body;

    /*     *****testing******
    console.log("Request body:", req.body);
    console.log("Authenticated user:", req.user);
    */

    if (!productId || !productName || !productPrice || !quantity) {
      return res.status(400).json({ message: "All fields are required!!!" })
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    const order = await Order.create({
      user: req.user.id,
      productId: product._id,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity,
      totalPrice: product.productPrice * quantity
    });
    if (order) {
      res.status(201).json(order)
    } else {
      res.status(400).json({ message: "error in your inputs!!" })
    }

  } catch (error) {
    res.status(500).json({ message: "Failed to create an order", error: error.message });
  }
};

//getting all created orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user","email").populate("productId","productName productUrl productDescription productPrice");
    if (!orders) {
      return res.status(404).json({ message: "No orders found!" })
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "Failed to get orders!!", error: error.message });
  }
};

//getting own orders
exports.getOwnOrders = async (req, res) => {
  try {

    //ensures orders matches the logged in user(what you have ordered)
    //use req.user
    const orders = await Order.find({ user: req.user}).populate("productId","productName productUrl productDescription productPrice");//

    // if (orders.length === 0) {
    //   return res.status(404).json({ message: "You have no any order!!" ,error:error.message})
    // }
    res.status(200).json(orders);
    console.log(orders);
  } catch (error) {

    res.status(500).json({ message: "Failed to fetch your own product!!", error: error.message })
  }
}

//updating own order
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found!!" })
    }
    //current user logged in
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found!!!",error:error.message })
    }

    //checking if user who made order is the one logged in
    if (order.user.toString() !== user.id) {
      return res.status(403).json({ message: "Forbidden to update others orders!!" })
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, req.body, {
        new: true, runValidators: true
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product!!!" ,error:error.message})
  }

}

//deleting own orders
exports.deleteOwnOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found!!" })
    }
    //current user logged in
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found!!!" })
    }

    //checking if user who made order is the one logged in
    if (order.user.toString() !== user.id) {
      return res.status(403).json({ message: "Forbidden to delete others orders!!" })
    }

    const deletedOwnOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedOwnOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product!!!",error:error.message })
  }

}

//deleting all orders
exports.deleteAllOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found!!" })
    }

    const deletedAllOrder = await Order.FindByIdAndDelete(req.params.id);
    if(!deletedAllOrder){
      res,status(403).json({message:"Forbidden to delete All orders!!"})
    }
    res.status(200).json(deletedAllOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product!!!" })
  }

}


