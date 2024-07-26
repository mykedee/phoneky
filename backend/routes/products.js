const express = require("express");
const {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  getFeaturedProduct,
  getSimilarProducts,
  addFeaturedProduct,
  removeFeaturedProduct,
} = require("../controllers/products");
const { protect, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

router.put(
  "/products/:id",
  upload.array("newPhotos"),
  protect,
  authorize("admin"),
  updateProduct
);
router.get("/products", getProducts);

router.get("/products/featured", getFeaturedProduct);
router.get("/products/related/:slug", getSimilarProducts);
router.get("/products/:slug", getProduct);
router.get("/products/:id", getProduct);
router.put("/products/:id", getProduct);
router.put(
  "/products/featured/:id",
  protect,
  authorize("admin"),
  addFeaturedProduct
);
router.put(
  "/products/unfeatured/:id",
  protect,
  authorize("admin"),
  removeFeaturedProduct
);

router.post(
  "/products",
  upload.array("photos"),
  protect,
  authorize("admin"),
  createProduct
);
router.delete("/products/:id", protect, deleteProduct);

// router.put(
//   "/products/:id",
//   // upload.array("photos"),
//   protect,
//   authorize("admin"),
//   updateProduct
// );
// router.put("/products/:id", updateProduct);

module.exports = router;
