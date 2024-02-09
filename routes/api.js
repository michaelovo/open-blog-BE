const express = require('express');
const PostController = require('../src/controllers/PostController');
const CategoryController = require('../src/controllers/CategoryController');
const router = express.Router();


// Post routes
router.get("/posts", PostController.fetchAllPosts);
router.post("/post/create", PostController.store);
router.get("/post/:postId/fetch", PostController.fetchPostById);
router.patch("/post/:postId/update", PostController.updatePost);
router.delete("/post/:postId/delete", PostController.deletePost);

//Category routes
router.get('/categories', CategoryController.fetchAllCategories);
router.post('/category/create', CategoryController.storeCategory);
router.get("/category/:categoryId/fetch", CategoryController.fetchAllCategoryById);
router.patch("/category/:categoryId/update", CategoryController.updateCategory);
router.delete("/category/:categoryId/delete", CategoryController.deleteCategory);

module.exports = router;