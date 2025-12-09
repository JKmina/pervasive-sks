const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.getUserByUsername(username);

  if (!user) return res.status(404).json({ message: "User not found" });

  const check = await bcrypt.compare(password, user.hash_passwd);
  if (!check) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login success", token });
};

// Register account
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const newUserData = {
    username,
    hash_passwd: hash,
    role,
  };

  const newUser = await User.createUser(newUserData);
  res.json({ message: "User registered", newUser });
};
