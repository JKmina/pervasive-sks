require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// This loads the routes from index.js
const indexRoutes = require("./index");

// Send all requests into index.js
app.use("/", indexRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running at port " + (process.env.PORT || 5000));
});
