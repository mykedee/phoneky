const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const fs = require("fs");
const path = require("path");


// getCategories /api/v1/categories
//public route 
exports.getCategories = async (req, res) => {
  try {
    const pageSize = process.env.pageSize;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Category.count({});
    let categories = await Category.find({})
      .populate("name", "name")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    if (categories) {
      res.status(200).json({
        success: true,
        categories,
        count,
        pageSize,
        page,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// getCategory /api/v1/categories
//public route admin
exports.getCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    // .populate(
    // 			"postedBy",
    // 			"username"
    // 		);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// createCategory /api/v1/categories
//private route admin
exports.createCategory = async (req, res) => {
  try {
    let catObj = {
      name: req.body.name,
    };
    if (req.file) {
      catObj.photo = `/${req.file.path}`;
    } else {
      return res.status(400).json({
        message: "Category image is required",
      });
    }
    const category = await Category.create(catObj);
    res.status(201).json({
      category,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// updater /api/v1/categories/:id
//private route admin
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(400).json({
        message: "category not found",
      });
    }

    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Product category updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};


// deleteCategory /api/v1/categories/:id
//private route admin
exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    let dy = path.resolve("./uploads");
    if (category.photo) {
      const basePath = dy;
      const imagePath = (basePath, category.photo.replace("/./", "./"));
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
          console.log(imagePath);
        } catch (error) {
          return res.status(500).json({
            error: error.message,
          });
        }
      } else {
        return res.status(400).json({
          message: "Image file not found",
        });
      }
    }
    category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: " Category deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
