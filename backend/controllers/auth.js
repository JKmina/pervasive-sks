const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =====================
// LOGIN
// =====================
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    // 2️⃣ Find user
    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Compare password
    const valid = await bcrypt.compare(password, user.hash_passwd);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 4️⃣ Sign JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5️⃣ Send token
    res.json({
      message: "Login success",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// =====================
// REGISTER
// =====================
exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // 1️⃣ Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // 2️⃣ Hash password
    const hash = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const newUser = await User.createUser({
      username,
      hash_passwd: hash,
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered",
      id: newUser.id,
      username: newUser.username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
