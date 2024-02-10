const express = require('express');
const PostController = require('../src/controllers/PostController');
const CategoryController = require('../src/controllers/CategoryController');
const AuthController = require('../src/controllers/AuthController');
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
router.get("/category/:categoryId/fetch", CategoryController.fetchCategoryById);
router.patch("/category/:categoryId/update", CategoryController.updateCategory);
router.delete("/category/:categoryId/delete", CategoryController.deleteCategory);

//Auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


module.exports = router;