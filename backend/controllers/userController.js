const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { GenerateToken } = require('../middlewares/authMiddleware')

//creating a user
exports.createUser = async (req, res) => {
  try {
    //destructuring the user
    const { name, email, password } = req.body;
    if ((!name, !email, !password)) {
      return res.status(400).json({ message: "All fields are required!!" });
    }

    //this says find one user document in the database 
    // whose email matches the provided email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists!!" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user to database
    //create to database with the provided record,save and return the exact record.
    const user = await User.create({ name, email, password: hashedPassword });
    if (user) {
      return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: GenerateToken(user),
      });
    } else {
      return res.status(400).json({ message: "Invalid user data!!" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//login user
exports.loggingUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password ){
      return res.status(400).json({message: "Enter All fields!!"})
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //comparing our password and hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: GenerateToken(user),
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get all users(admin priviledge)
exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No User found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//getting a one user(admin priviledge)
exports.getOneUser = async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
      id: _id,
      name,
      email,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update a user(admin priviledge)
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    //use of query condition({_id:id})- this checks if there
    //is a document with _id that matches id from paramater request.
    const userExists = await User.findOne({_id:id});
    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//deleting a user(admin priviledge)
exports.deleteUser = async (req, res) => {
  try {

    //id from parameter request.
    const id = req.params.id;
    const userExists = await User.findOne({_id:id});
    if (!userExists) {
      return res.status(404).json({ message: "User Not Found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

