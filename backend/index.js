const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5001",
    "https://pervasive-sks-production.up.railway.app",
    "https://pervasive-sksdeploy.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// 1. Pasang CORS Global
app.use(cors(corsOptions));

// 2. Pasang Preflight Handler (PERBAIKAN DISINI)
// Ganti "*" menjadi "(.*)" atau hapus parameternya
app.options("(.*)", cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authroutes"));

// Pastikan bind ke 0.0.0.0 untuk Railway
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
