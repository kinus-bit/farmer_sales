const express = require("express");
const router = express.Router();
const { Protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/authMiddleware");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOwnProducts,
  updateOwnProduct,
  deleteOwnProduct,
} = require("../controllers/productController");


//getting all
router.get("/all",getProducts);

//getting own products(seller)
router.get("/own",Protect,getOwnProducts);

//creating a product
router.post("/create",Protect, createProduct);

//updating all product(admin)
router.put("/update/:id", Protect,admin,updateProduct);

//updating own product(seller)
router.put("/updateown/:id", Protect,updateOwnProduct);

//deleting a product(admin)
router.delete("/delete/:id", Protect,admin,deleteProduct);

//deleting own product(seller)
router.delete("/deleteown/:id", Protect,deleteOwnProduct);

module.exports = router;
