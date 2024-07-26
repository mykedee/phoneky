const express = require("express");
const {
	getMe,
	updateUserDetails,
	updateProfileImage,
} = require("../controllers/users");
const { protect} = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.put(
	"/auth/updatephoto",
	protect,
	upload.single("photo"),
	updateProfileImage
);
router.put("/auth/updatedetails", protect, updateUserDetails);
router.get("/auth/me", protect, getMe);

module.exports = router;
