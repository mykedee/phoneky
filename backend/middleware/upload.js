const multer = require("multer");
const SharpMulter = require("sharp-multer");

const fileName = (og_filename, options) => {
  let newname =
    og_filename.split(".").slice(0, -1).join(".") +
    "_" +
    Date.now() +
    "." +
    options.fileFormat;
  return newname;
};

const storage = SharpMulter({
  destination: (req, file, cb) => cb(null, "./uploads"),
  imageOptions: {
    fileFormat: "jpg",
    quality: 80,
    resize: { width: 680, height: 680, resizeMode: "contain" },
  },
  filename: fileName,
});

// multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "./uploads");
// 	},
// 	filename: function (req, file, cb) {
// 		// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// 		cb(null, file.originalname);
// 	},
// });

upload = multer({ storage });

module.exports = upload;

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "./uploads");
// 	},
// 	filename: function (req, file, cb) {
// 		// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// 		cb(null, file.originalname);
// 	},
// });

// upload = multer({ storage: storage });

// module.exports = upload;
