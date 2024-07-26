const mongoose = require("mongoose");

const featuredSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    url: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Featured", featuredSchema);
