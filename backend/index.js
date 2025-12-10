const express = require("express");
const app = express();
app.use(express.json());

// ROUTES
app.use("/api/products", require("./routes/productroutes"));
app.use("/api/orders", require("./routes/orderroutes.js"));
app.use("/api/tags", require("./routes/rfidroutes"));
app.use("/api/auth", require("./routes/authroutes"));

console.log("Auth route mounted at /api/auth");

module.exports = app;
