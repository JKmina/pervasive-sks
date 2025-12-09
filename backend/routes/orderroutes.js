const router = require("express").Router();
const orderController = require("../controllers/orders");

// GET all orders
router.get("/", orderController.getOrders);

// GET specific order
router.get("/:id", orderController.getOrder);

// CREATE new order
router.post("/", orderController.createOrder);

// UPDATE order
router.put("/:id", orderController.updateOrder);

// DELETE order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
