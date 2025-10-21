const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders, getOwnOrders, updateOrder, deleteOwnOrder, deleteAllOrder } = require("../controllers/orderController");
const { Protect, admin } = require("../middlewares/authMiddleware");

//getting orders
router.get("/getAll", Protect, getAllOrders);

//getting own orders
router.get("/own",Protect, getOwnOrders);

//creating a new order
router.post("/create", Protect, createOrder);

//updating own orders
router.put("/update/:id", Protect,updateOrder);

//delete own order
router.delete("/deleteown/:id",Protect, deleteOwnOrder);

//delete all orders
router.delete("/deleteall/:id",Protect,admin, deleteAllOrder);

module.exports = router;

