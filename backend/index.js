const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5001",
      "https://pervasive-sks-production.up.railway.app",
    ],
    credentials: true,
  })
);

// ROUTES
app.use("/api/products", require("./routes/productroutes"));
app.use("/api/orders", require("./routes/orderroutes"));
app.use("/api/tags", require("./routes/rfidroutes"));
app.use("/api/auth", require("./routes/authroutes"));

console.log("Auth route mounted at /api/auth");

module.exports = app;
