const models = require('../models');
const Validator = require('fastest-validator');

function fetchAllPosts(req, res) {
    models.Post.findAll().then(result => {
        res.status(200).json({
            "status": true,
            "message": "Post retrieved successfully",
            "post": result
        });
    }).catch(error => {
        res.status(500).json({
            "status": false,
            "message": "Something went wrong",
            "error": error
        });
    });
}

function store(req, res) {
    const post = {
        title: req.body.title,
        content: req.body.content,
        //image_url: req.body.image_url,
        category_id: req.body.category_id,
        status_id: req.body.status_id,
        user_id: 1
    }

    const schema = {
        title: "string|max:100|min:2|optional:false|nullable:false",
        content: "string|max:500|min:2|optional:false|nullable:false",
        //image_url: "string|optional:true|nullable:true",
        category_id: "number|positive:true|integer:true|min:1|optional:false|nullable:false",
        status_id: "number|positive:true|integer:true|min:1|optional:false|nullable:false"
    }
    const check = new Validator();
    const validatorResponse = check.validate(post, schema);

    if (validatorResponse !== true) {
        return res.status(400).json({
            "status": false,
            "message": "Validation failed!",
            "error": validatorResponse
        });
    }

    models.Post.create(post).then(result => {
        res.status(200).json({
            "status": true,
            messsage: 'Post created successfully',
            "post": result
        });
    }).catch(error => {
        res.status(500).json({
            "status": false,
            messsage: 'Something went wrong',
            "error": error
        });
    });
}

function fetchPostById(req, res) {
    const postId = req.params.postId;

    models.Post.findByPk(postId).then(result => {
        if (result) {
            res.status(200).json({
                "status": true,
                "message": "Data retrieved successfuly",
                "post": result
            });
        } else {
            res.status(404).json({
                "status": false,
                "message": "The selected post does not exist!!",

            });
        }
    }).catch(error => {
        res.status(500).json({
            "status": false,
            "message": "Something went wrong",
            "error": error
        })
    });
}

function updatePost(req, res) {

    const postId = req.params.postId;

    const post = {
        title: req.body.title,
        content: req.body.content,
        //image_url: req.body.image_url,
        category_id: req.body.category_id,
        status_id: req.body.status_id,
    }

    const userId = 1;

    const schema = {
        title: "string|max:100|min:2|optional:false|nullable:false",
        content: "string|max:500|min:2|optional:false|nullable:false",
        //image_url: "string|optional:true|nullable:true",
        category_id: "number|positive:true|integer:true|min:1|optional:false|nullable:false",
        status_id: "number|positive:true|integer:true|min:1|optional:false|nullable:false"
    }
    const check = new Validator();
    const validatorResponse = check.validate(post, schema);

    if (validatorResponse !== true) {
        return res.status(400).json({
            "status": false,
            "message": "Validation failed!",
            "error": validatorResponse
        });
    }

    models.Post.findOne({ where: { id: postId, user_id: userId } }).then(result => {

        if (result) {
            models.Post.update(post, { where: { id: postId, user_id: userId } }).then(result => {
                res.status(200).json({
                    "status": true,
                    messsage: 'Post updated successfully',
                    "post": post
                });
            }).catch(error => {
                res.status(500).json({
                    "status": false,
                    messsage: 'Something went wrong',
                    "error": error
                });
            });
        } else {
            res.status(404).json({
                "message": "The selected post does not exist!",
            });
        }
    }).catch(error => {
        res.status(500).json({
            "status": false,
            "message": "Something went wrong",
            "error": error
        });
    });
}

function uploadPostImage(req, res) {
    const postId = req.params.postId;

    const post = {
        "image_url": req.file.filename,
    }

    const schema = {
        image_url: "string|optional:false|nullable:false",
    }

    const check = new Validator();
    const validatorResponse = check.validate(post, schema);

    if (validatorResponse !== true) {
        return res.status(400).json({
            "status": false,
            "message": "Validation failed!",
            "error": validatorResponse
        });
    }

    models.Post.findOne({ where: { id: postId } }).then(result => {
        if (result) {

            models.Post.update(post, { where: { id: postId } }).then(result => {
                res.status(200).json({
                    "status": true,
                    "messsage": 'Image uploaded successfully',
                    "post": post
                });
            }).catch(error => {
                res.status(500).json({
                    "status": false,
                    messsage: 'Something went wrong',
                    "error": error
                });
            });

        } else {
            res.status(404).json({
                "message": "The selected post does not exist!",
            });
        }

    }).catch(error => {
        res.status(500).json({
            "status": false,
            "message": "Something went wrong",
            "error": error
        });
    });

}

function deletePost(req, res) {

    const postId = req.params.postId;

    const userId = 1;

    models.Post.destroy({ where: { id: postId, user_id: userId } }).then(result => {
        if (result) {
            res.status(200).json({
                "status": true,
                "messsage": 'Post delete successfully',
            });
        }
        res.status(404).json({
            "status": false,
            "message": "Record does not exist",
        });

    }).catch(error => {
        res.status(500).json({
            "status": false,
            messsage: 'Something went wrong',
            "error": error
        });
    });
}

module.exports = {
    fetchAllPosts: fetchAllPosts,
    store: store,
    fetchPostById: fetchPostById,
    updatePost: updatePost,
    deletePost: deletePost,
    uploadPostImage: uploadPostImage
}