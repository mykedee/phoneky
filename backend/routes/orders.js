const express = require("express");
const {
  payStackPay,
  payStackHook,
  getLocation,
} = require("../controllers/orders");
// const { decreaseQuantity } = require("../controllers/products");
// const { protect, authorize } = require("../middleware/auth");

const router = express.Router();
router.post("/payment", payStackPay);
router.get("/location", getLocation);
router.post("/paystackhook", payStackHook);


module.exports = router;
