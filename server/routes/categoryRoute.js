const express = require('express')
const { CreateCategory, getCategories,getCategory,
    deleteCategory,updateCategory
 } = require('../service/categoryService');
const { protect, allowedTo } = require("../service/authService");


const router = express.Router()


router
  .route("/")
  .get(getCategories)
  .post(protect, allowedTo("admin", "manager"), CreateCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(protect, allowedTo("admin", "manager"), updateCategory)
  .delete(protect, allowedTo("admin"), deleteCategory);


module.exports = router