const express = require("express");
const { createFeatured, getFeatured } = require("../controllers/featured");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

router.post(
  "/featured",
  upload.single("photo"),
  protect,
  authorize("admin"),
  createFeatured
);

router.get("/featured", getFeatured);


module.exports = router;
