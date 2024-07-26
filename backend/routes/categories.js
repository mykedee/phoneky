const express = require("express");
const {
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
} = require("../controllers/categories");
const upload = require("../middleware/upload");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router();


router.post(
  "/categories",
  upload.single("photo"),
  protect,
  authorize("admin"),
  createCategory
);

router.delete("/categories/:id", protect, deleteCategory);
router.put("/categories/:id", protect, updateCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);
module.exports = router;
