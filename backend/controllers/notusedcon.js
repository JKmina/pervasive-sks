const OrderDetailModel = require("../models/orderdetailmodel");
const OrderDetail = require("../models/orderdetailmodel");

exports.getDetails = async (req, res) => {
  const data = await OrderDetailModel.getde();
  res.json(data);
};

exports.getDetail = async (req, res) => {
  const data = await OrderDetail.findById(req.params.id);
  res.json(data);
};

exports.createDetail = async (req, res) => {
  const data = await OrderDetail.create(req.body);
  res.json({ message: "Order detail created", data });
};

exports.updateDetail = async (req, res) => {
  const data = await OrderDetail.update(req.params.id, req.body);
  res.json({ message: "Order detail updated", data });
};

exports.deleteDetail = async (req, res) => {
  const data = await OrderDetail.delete(req.params.id);
  res.json({ message: "Order detail deleted", data });
};
