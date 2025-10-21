const express = require("express");
const { connectDB } = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({ origin: "*"}));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users",userRoutes);
app.use("/api/orders",orderRoutes);

app.get("/", (req, res) => {
  res.send("backend running");
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
