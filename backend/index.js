const express = require("express");
const cors = require("cors"); // Pastikan ini ada di atas
const app = express();

// 1. Definisikan opsi CORS dalam variabel agar konsisten
const corsOptions = {
  origin: [
    "http://localhost:5001",
    "https://pervasive-sks-production.up.railway.app",
    "https://pervasive-sksdeploy.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow methods
  allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow headers
  credentials: true,
};

// 2. Terapkan CORS middleware SEBELUM route apapun
app.use(cors(corsOptions));

// 3. Handle preflight request secara eksplisit menggunakan opsi yang SAMA
// Ini opsional jika app.use(cors()) sudah ada, tapi bagus untuk memastikan
app.options("*", cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authroutes"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running...");
});
