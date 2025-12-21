const OrderModel = require("../models/ordermodel");

class OrderController {
  /** =========================
   * GET ALL ORDERS
   ========================== */
  static async getOrders(req, res) {
    try {
      const orders = await OrderModel.getAllOrders();
      res.status(200).json(orders);
    } catch (err) {
      console.error("GET ORDERS ERROR:", err);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  }

  /** =========================
   * GET ORDER BY ID
   ========================== */
  static async getOrder(req, res) {
    try {
      const { id } = req.params;
      const order = await OrderModel.getOrderById(id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (err) {
      console.error("GET ORDER ERROR:", err);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  }

  /** =========================
   * CREATE ORDER
   ========================== */
  static async createOrder(req, res) {
    try {
      const { order, items } = req.body;

      if (!order || !items || items.length === 0) {
        return res
          .status(400)
          .json({ message: "Order and items are required" });
      }

      const result = await OrderModel.createOrder({ order, items });

      res.status(201).json(result);
    } catch (err) {
      console.error("CREATE ORDER ERROR:", err);
      res.status(500).json({ message: "Failed to create order" });
    }
  }

  /** =========================
   * UPDATE ORDER
   ========================== */
  static async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { order, items } = req.body;

      if (!order || !items) {
        return res
          .status(400)
          .json({ message: "Order and items are required" });
      }

      await OrderModel.updateOrder(id, { order, items });

      res.status(200).json({ message: "Order updated successfully" });
    } catch (err) {
      console.error("UPDATE ORDER ERROR:", err);
      res.status(500).json({ message: "Failed to update order" });
    }
  }

  /** =========================
   * DELETE ORDER
   ========================== */
  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;

      await OrderModel.deleteOrder(id);

      res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
      console.error("DELETE ORDER ERROR:", err);
      res.status(500).json({ message: "Failed to delete order" });
    }
  }
}

module.exports = OrderController;
