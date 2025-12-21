const router = require("express").Router();
const detailController = require("../controllers/notusedcon");

// GET all
router.get("/", detailController.getDetails);

// GET by id
router.get("/:id", detailController.getDetail);

// CREATE new detail
router.post("/", detailController.createDetail);

// UPDATE detail
router.put("/:id", detailController.updateDetail);

// DELETE detail
router.delete("/:id", detailController.deleteDetail);

module.exports = router;
