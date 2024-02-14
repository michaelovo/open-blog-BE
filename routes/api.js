const express = require('express');
const PostController = require('../src/controllers/PostController');
const CategoryController = require('../src/controllers/CategoryController');
const AuthController = require('../src/controllers/AuthController');
const CommentController = require('../src/controllers/CommentController');
const AuthCheckMiddleware = require('../src/middleware/AuthCheck');
const ImageUploader = require('../src/utils/ImageUpload');
const router = express.Router();


//Auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Post routes
router.get("/posts", PostController.fetchAllPosts);
router.post("/post/create", AuthCheckMiddleware.authCheck, PostController.store);
router.get("/post/:postId/fetch", PostController.fetchPostById);
router.patch("/post/:postId/update", AuthCheckMiddleware.authCheck, PostController.updatePost);
router.delete("/post/:postId/delete", AuthCheckMiddleware.authCheck, PostController.deletePost);
router.patch('/post/:postId/image/upload', AuthCheckMiddleware.authCheck, ImageUploader.upload.single('image_url'), PostController.uploadPostImage);

//Category routes
router.get('/categories', CategoryController.fetchAllCategories);
router.post('/category/create', AuthCheckMiddleware.authCheck, CategoryController.storeCategory);
router.get("/category/:categoryId/fetch", CategoryController.fetchCategoryById);
router.patch("/category/:categoryId/update", AuthCheckMiddleware.authCheck, CategoryController.updateCategory);
router.delete("/category/:categoryId/delete", AuthCheckMiddleware.authCheck, CategoryController.deleteCategory);

//comment routes
router.get('/comments', CommentController.fetchAllComments);
router.post('/comment/create', AuthCheckMiddleware.authCheck, CommentController.store);
router.get("/comment/:commentId/fetch", CommentController.fetchCommentById);
router.patch("/comment/:commentId/update", AuthCheckMiddleware.authCheck, CommentController.updateComment);
router.delete("/comment/:commentId/delete", AuthCheckMiddleware.authCheck, CommentController.deleteComment);
router.get("/post/:postId/comments", AuthCheckMiddleware.authCheck, CommentController.fetchPostComments);



module.exports = router;