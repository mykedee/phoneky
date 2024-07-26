const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Product = require("../models/productModel");
const fs = require("fs");
const path = require("path");

//getProducts /products
//public route
exports.getProducts = async (req, res, next) => {
  const pageSize = process.env.pageSize;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await Product.countDocuments({ ...keyword });

  let products = await Product.find({ ...keyword })
    .populate("category", "name")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (!products) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404),
    );
  }
  res.status(200).json({
    products,
    pages: Math.ceil(count / pageSize),
    count,
    pageSize,
    keyword,
    page,
  });
};

//getProduct /products
//public route
exports.getProduct = asyncHandler(async (req, res, next) => {
  let slug = req.params.slug;
  let product = await Product.findOne({ slug }).populate("category", "name");
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with slug of ${req.params.slug}`)
    );
  }
  res.status(200).json(product);
});

//getSimilarProducts /products/related/:slug
//public route
exports.getSimilarProducts = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;
  const product = await Product.findOne({ slug }).populate(
    "category",
    "name _id"
  );

  const categoryName = product.category._id;
  const related = await Product.find({
    _id: { $ne: product },
    category: categoryName,
  })
    .limit(5)
    .populate("category", "name _id")
    .exec();
  res.status(200).json({
    related,
  });
});


//getFeaturedProducts /products/featured
//public route
exports.getFeaturedProduct = asyncHandler(async (req, res, next) => {
  let featured = await Product.find({ isFeatured: true });
  res.status(200).json({ featured });
});


//updateProduct /products/featured
//private route admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 400)
    );
  }

  if (
    product.postedBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorised to perform this action"));
  }
  const { title, description, price, qty, category, existingPhotos } = req.body;
  product.title = title;
  product.description = description;
  product.price = price;
  product.qty = qty;
  product.category = category;

  // Parse existingPhotos JSON string
  if (existingPhotos) {
    product.photos = JSON.parse(existingPhotos);
  }

  // Add new photos to the product
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      product.photos.push({ img: `/${file.path}` }); // Adjust according to your file storage strategy
    });
  }

  await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
});

//deleteProduct /product
//private route admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  let dy = path.resolve("./uploads");
  if (product.photos && product.photos.length > 0) {
    const basePath = dy;
    for (const omg of product.photos) {
      const imagePath = (basePath, omg.img.replace("/./", "./"));
      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
        } catch (error) {
          return res.status(500).json({
            error: error.message,
          });
        }
      } else {
        return next(new ErrorResponse("Image file not found", 404));
      }
    }
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: " Product deleted successfully",
  });
});

// updateUser
// getUser /api/v1/auth/users/:id
//private/admin
exports.addFeaturedProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findByIdAndUpdate(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`)
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse("Not authorised to perform this action", 401)
    );
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: { isFeatured: true } },
    { runValidators: true, new: true }
  );

  res.status(200).json({
    product,
    message: "Product updated successfully",
  });
});

exports.removeFeaturedProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  if (req.user.role !== "admin") {
    return new ErrorResponse("Not authorised to perform this action", 401);
  }

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { $unset: { isFeatured: false } },
    { runValidators: true, new: true }
  );
  res.status(200).json({
    product,
    message: "Product updated successfully",
  });
});

exports.decreaseQuantity = asyncHandler(async (req, res, next) => {
  let bulkOps = req.body.orderItems.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { qty: -item.qty } },
      },
    };
  });
  await Product.bulkWrite(bulkOps, {});
  next();
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  let { category, title, qty, description, price, isFeatured } = req.body;
  let photos = [];
  if (req.files.length > 0) {
    photos = req.files.map((file) => {
      return { img: `/${file.path}` };
    });
  } else {
    return next(new ErrorResponse("Product image is required", 400));
  }
  if (!title || !description || !price || !qty) {
    return next(new ErrorResponse("All fields is required", 400));
  }
  await Product.create({
    photos,
    title,
    price,
    description,
    isFeatured,
    category,
    qty,
    postedBy: req.user.id,
  });
  res.status(201).json({
    success: true,
    message: "Product created successfully",
  });
});
