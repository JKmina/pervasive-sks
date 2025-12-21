require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const cors = require("cors");

// This loads the routes from index.js
const indexRoutes = require("./index");

// Send all requests into index.js
app.use("/", indexRoutes);

app.listen(PORT, () => {
  console.log("Server running at port ", PORT);
});

app.use(
  cors({
    origin: "*",
  })
);
