const Product = require("../models/productmodel");

/** =========================
 * GET ALL PRODUCTS
 ========================== */
exports.getProducts = async (req, res) => {
  try {
    const data = await Product.getAllProducts();
    res.status(200).json(data);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

/** =========================
 * GET PRODUCT BY ID
 ========================== */
exports.getProduct = async (req, res) => {
  try {
    const data = await Product.getProductById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error("GET PRODUCT ERROR:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

/** =========================
 * CREATE PRODUCT
 ========================== */
exports.createProduct = async (req, res) => {
  try {
    const data = await Product.createProduct(req.body);
    res.status(201).json({
      message: "Product created successfully",
      data,
    });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(400).json({
      error: err.message || "Failed to create product",
    });
  }
};

/** =========================
 * UPDATE PRODUCT
 ========================== */
exports.updateProduct = async (req, res) => {
  try {
    const data = await Product.updateProduct(req.params.id, req.body);
    res.status(200).json({
      message: "Product updated successfully",
      data,
    });
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(400).json({
      error: err.message || "Failed to update product",
    });
  }
};

/** =========================
 * DELETE PRODUCT
 ========================== */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.id);
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({
      error: err.message || "Failed to delete product",
    });
  }
};
