const router = require("express").Router();
const tagController = require("../controllers/rfidtags");

// GET all tags
router.get("/", tagController.getTags);

// GET tag by id
router.get("/:id", tagController.getTag);

// CREATE new tag
router.post("/", tagController.createTag);

// DELETE tag
router.delete("/:id", tagController.deleteTag);

module.exports = router;
