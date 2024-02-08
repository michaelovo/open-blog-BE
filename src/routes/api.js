const express = require('express');
const PostController = require('../src/controllers/PostController');
const router = express.Router();


router.get("/posts", PostController.index);

module.exports = router;