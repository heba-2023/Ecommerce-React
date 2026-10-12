const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModels");
const ApiError = require("../utils/apiError");

// create
exports.createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.status(201).json({ data: category });
});

// get all
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ results: categories.length, data: categories });
});

// get by id
exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ApiError(`No category for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: category });
});

// update
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { returnDocument: "after", runValidators: true },
  );
  if (!category) {
    return next(new ApiError(`No category for this id ${req.params.id}`, 404));
  }
  res
    .status(200)
    .json({ message: "Category updated successfully", data: category });
});

// delete
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(new ApiError(`No category for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ message: "Category deleted successfully" });
});
