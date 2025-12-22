const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());

// Proper CORS setup
app.use(cors({
  origin: [
    "http://localhost:5001",
    "https://pervasive-sks-production.up.railway.app",
    "https://pervasive-sksdeploy.vercel.app"
  ],
  credentials: true
}));

// This ensures preflight requests are handled
app.options("*", cors());

app.use("/api/auth", require("./routes/authroutes"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});
