const mongoose = require("mongoose");
const slugify = require("slugify");
const { nanoid } = require("nanoid");

let productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },

  description: {
    type: String,
    required: [true, "Body is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  // rating: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  // numReviews: {
  //   type: Number,
  //   required: true,
  //   default: 0,
  // },
  qty: {
    type: Number,
    required: [true, "Quantity is required"],
  },

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Author is required"],
  },

  photos: [{ img: { type: String } }],
  slug: {
    type: String,
    slug: "title",
  },
  productCode: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("save", function () {
  // let slugid =
  this.productCode = nanoid(10);
  this.slug = slugify(
    this.title.split(" ").join("-") + "-" + this.productCode,
    { lower: true }
  );
});

module.exports = mongoose.model("Product", productSchema);
