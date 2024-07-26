const Featured = require("../models/featuredModel.js");

exports.createFeatured = async (req, res) => {
  try {
    const { url, title } = req.body;
    let photo;
    if (req.file) {
      photo = `/${req.file.path}`;
    }
    if (!url) {
      return res.json({ message: "Field is required" });
    }
    let featured = await Featured.create({ photo, url, title });
    res.status(201).json({
      success: true,
      featured,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.getFeatured = async (req, res) => {
  try {
    const pageSize = 20;
    const page = Number(req.query.page) || 1;
    const count = await Featured.countDocuments();

    const featured = await Featured.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      success: true,
      featured,
      pages: Math.ceil(count / pageSize),
      count,
      pageSize,
      page,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
