const Product = require("../models/productmodel");

// GET all products
exports.getProducts = async (req, res) => {
  const data = await Product.getAllProducts();
  res.json(data);
};

// GET product by id
exports.getProduct = async (req, res) => {
  const data = await Product.getProductById(req.params.id);
  res.json(data);
};

// CREATE product
exports.createProduct = async (req, res) => {
  const data = await Product.createProduct(req.body);
  res.json({ message: "Product created", data });
};

// UPDATE product
exports.updateProduct = async (req, res) => {
  const data = await Product.updateProduct(req.params.id, req.body);
  res.json({ message: "Product updated", data });
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  const data = await Product.deleteProduct(req.params.id);
  res.json({ message: "Product deleted", data });
};
