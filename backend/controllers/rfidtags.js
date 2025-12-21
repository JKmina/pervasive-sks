const RFIDTag = require("../models/rfidtagsmodel");

exports.getTags = async (req, res) => {
  const data = await RFIDTag.getAllTags();
  res.json(data);
};

exports.getTag = async (req, res) => {
  const data = await RFIDTag.getTagsForProduct(req.params.id);
  res.json(data);
};

exports.createTag = async (req, res) => {
  const data = await RFIDTag.createTag(req.body);
  res.json({ message: "RFID Tag created", data });
};

exports.deleteTag = async (req, res) => {
  const data = await RFIDTag.delete(req.params.id);
  res.json({ message: "RFID Tag deleted", data });
};
