const router = require("express").Router();
const productController = require("../controllers/products");

// GET all
router.get("/", productController.getProducts);

// GET by ID
router.get("/:id", productController.getProduct);

// CREATE new
router.post("/", productController.createProduct);

// UPDATE
router.put("/:id", productController.updateProduct);

// DELETE
router.delete("/:id", productController.deleteProduct);

module.exports = router;
