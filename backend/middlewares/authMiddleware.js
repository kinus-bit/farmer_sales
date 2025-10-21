const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.Protect = async (req, res, next) => {
  let token;

  //checking the authorisation header exists and starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //decodes(extract) user information from the token(has the id) and to req
      req.user = await User.findById(decoded.id).select("-password");

      //calling the next piece of middleware or route handler
      next();
    } catch (error) {
      res.status(400).json({ message: "Not authorized,token failed!!" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized,you have no token!!" });
  }
};

//generating a token
exports.GenerateToken =  (user) => {
  return jwt.sign({ id:user._id,role:user.role}, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//admin middlewares
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
