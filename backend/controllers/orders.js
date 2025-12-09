const OrderModel = require("../models/ordermodel");
const OrderDetailModel = require("../models/orderdetailmodel");

exports.getOrders = async (req, res) => {
  try {
    const data = await OrderModel.getAllOrders();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await OrderModel.getOrderById(id);
    const details = await OrderDetailModel.getDetailsByOrderId(id);

    res.json({
      ...order,
      items: details,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { order, items } = req.body;
    const newOrder = await OrderModel.createOrder(order);

    const orderDetailsData = items.map((item) => ({
      ord_id: newOrder.id,
      prod_id: item.prod_id,
      qty: item.qty,
      total_price: item.total_price,
    }));

    await OrderDetailModel.addMultiple(orderDetailsData);

    res.json({ message: "Order created successfully", orderId: newOrder.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const { order, items } = req.body;

    // 1️⃣ Update order
    await OrderModel.updateOrder(id, order);

    // 2️⃣ Delete old details
    await OrderDetailModel.deleteDetailsByOrderId(id);

    // 3️⃣ Insert new details
    const orderDetailsData = items.map((item) => ({
      ord_id: id,
      prod_id: item.prod_id,
      qty: item.qty,
      total_price: item.total_price,
    }));

    await OrderDetailModel.addMultiple(orderDetailsData);

    res.json({ message: "Order updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    await OrderDetailModel.deleteDetailsByOrderId(id);
    await OrderModel.deleteOrder(id);

    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
