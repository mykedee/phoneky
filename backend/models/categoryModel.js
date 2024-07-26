const mongoose = require("mongoose");
const slugify = require("slugify");

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    unique: true,
  },
  photo: {
    type: String,
  },
  slug: {
    type: String,
    slug: "name",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// postSchema.pre('save', function () {
//   // let slugid =
//   this.slug = slugify(this.title.split(' ').join('-') + '-' + this.productCode, { lower: true })
// })

categorySchema.pre("save", function () {
  // let slugid =
  this.slug = slugify(this.name, { replacement: "-", lower: true });
});
module.exports = mongoose.model("Category", categorySchema);
