const Product = require("../models/Product");
const User = require("../models/user");

//creating a product
exports.createProduct = async (req, res) => {
  try {
    const {productUrl , productName , productDescription , productPrice } = req.body;
    if(!productUrl || !productName || !productDescription || !productPrice){
        return res.status(400).json({message:"All inputs are required"});
      }

    //ensure a product is created together with a
    //user who has created it.
    const product = await Product.create({
      productUrl,productName,productDescription,productPrice ,user:req.user.id
    });
    if(!product){
      return res.status(400).json({message:"Error creating a product!!"})
    }
    res.status(201).send(product);
  } catch (error) {
    res.status(500).send({message:"creation of product failed!!"});
  }
};

//getting all the products(admin)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if(products.length === 0){
      return res.status(404).json({message:"No available product!!"});
    }
    res.status(200).send(products);
  } catch (error) {
    res
      .status(500)
      .json({ message:"fetching of product failed!!"});
  }
};

//get own products(seller)
exports.getOwnProducts = async (req,res) =>{
  try {

    //this finds all products in the database whose 
    // user field equals to the currently logged in user
    const products = await Product.find({user:req.user.id});
   
    if(products.length === 0){
      return res.status(404).json({message:"You don't have any posted products !!"});
    }
    res.status(200).json(products); 
  } catch (error) {
    res.status(500).json({message:"fetching of product failed!!"})
  }
}

//update product(admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!!" });
    }
    const updatePro = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if(!updatePro){
      return res.status(400).json({message:"Eror updating product!"})
    }
    res.json(updatePro);
  } catch (error) {
    res.status(500).json({message:"Failed to update product!"});
  }
};

//update own products(seller)
exports.updateOwnProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!!" });
    }  
    const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message: "User not found!!"});
    }
    //check if the product(that was created by a user) to be updated belongs to the currently logged in user
    if(product.user.toString() !== user.id){
      return res.status(403).json({message:"You are forbidden to update other peoples products!!"});
    }
    const updatePro = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if(!updatePro){
      return res.status(400).json({message:"Eror updating product!"})
    }
    res.json(updatePro);
  } catch (error) {
    res.status(500).json({message:"Failed to update product!"});
  }
};


//deleting a product(admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfuly" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product!!" });
  }
};

//deleting own product(seller)
exports.deleteOwnProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "product not found" });
    }
     const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message: "User not found!!"});
    }
    //check if the product(that was created by a user) to be deleted belongs to the currently logged in user
    if(product.user.toString() !== user.id){
      return res.status(403).json({message:"You are forbidden to delete other peoples products!!"});
    }
     await Product.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Product deleted successfuly" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

