const express = require("express");
const {
  signin,
  logout
} = require("../controllers/auth");

const router = express.Router();

router.post("/auth/signin", signin);
router.post("/auth/logout", logout);


module.exports = router;
