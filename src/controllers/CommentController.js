const models = require('../models');
const Validator = require('fastest-validator');

function fetchAllComments(req, res) {
    models.Comment.findAll(
        {
            include: [
                {
                    model: models.User,
                    as: 'postedBy',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: models.Post,
                    as: 'post',
                    attributes: ['id', 'title'],
                }
            ],
        }
    ).then(result => {
        res.status(200).json({
            "status": true,
            "message": "Comments retrieved successfully",
            "comment": result
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
    const comment = {
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: req.userData.id,
    }

    const schema = {
        content: "string|max:500|min:2|optional:false|nullable:false",
        post_id: "number|positive:true|integer:true|min:1|optional:false|nullable:false"
    }
    const check = new Validator();
    const validatorResponse = check.validate(comment, schema);

    if (validatorResponse !== true) {
        return res.status(400).json({
            "status": false,
            "message": "Validation failed!",
            "error": validatorResponse
        });
    }

    models.Comment.create(comment).then(result => {
        res.status(200).json({
            "status": true,
            "messsage": 'Comment created successfully',
            "comment": result
        });
    }).catch(error => {
        res.status(500).json({
            "status": false,
            "messsage": 'Something went wrong',
            "error": error
        });
    });
}

function fetchCommentById(req, res) {
    const commentId = req.params.commentId;

    models.Comment.findByPk(commentId,
        {
            include: [
                {
                    model: models.User,
                    as: 'postedBy',
                    attributes: ['id', 'username', 'email'],
                },
                {
                    model: models.Post,
                    as: 'post',
                    attributes: ['id', 'title'],
                }
            ],
        }
    ).then(result => {
        if (result) {
            res.status(200).json({
                "status": true,
                "message": "Data retrieved successfuly",
                "comment": result
            });
        } else {
            res.status(404).json({
                "status": false,
                "message": "The selected Comment does not exist!!",

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

function updateComment(req, res) {

    const commentId = req.params.commentId;

    const comment = {
        content: req.body.content,
    }

    const userId = req.userData.id;

    const schema = {
        content: "string|max:500|min:2|optional:false|nullable:false",
    }
    const check = new Validator();
    const validatorResponse = check.validate(comment, schema);

    if (validatorResponse !== true) {
        return res.status(400).json({
            "status": false,
            "message": "Validation failed!",
            "error": validatorResponse
        });
    }

    models.Comment.findOne({ where: { id: commentId, user_id: userId } }).then(result => {

        if (result) {
            models.Comment.update(comment, { where: { id: commentId, user_id: userId } }).then(result => {
                res.status(200).json({
                    "status": true,
                    "messsage": 'Comment updated successfully',
                    "comment": comment
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
                "message": "The selected comment does not exist!",
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

function deleteComment(req, res) {

    const commentId = req.params.commentId;

    const userId = req.userData.id;

    models.Comment.destroy({ where: { id: commentId, user_id: userId } }).then(result => {
        if (result) {
            res.status(200).json({
                "status": true,
                "messsage": 'Comment delete successfully',
            });
        }
        res.status(404).json({
            "status": false,
            "message": "Record does not exist",
        });

    }).catch(error => {
        res.status(500).json({
            "status": false,
            "messsage": 'Something went wrong',
            "error": error
        });
    });
}

function fetchPostComments(req, res) {
    const postId = req.params.postId;

    models.Comment.findAll({
        where: { post_id: postId },
        include: [
            {
                model: models.User,
                as: 'postedBy',
                attributes: ['id', 'username', 'email'],
            },
            {
                model: models.Post,
                as: 'post',
                attributes: ['id', 'title'],
            }
        ],
    }).then(result => {
        if (result) {
            res.status(200).json({
                "status": true,
                "message": "Data retrieved successfuly",
                "comment": result
            });
        } else {
            res.status(404).json({
                "status": false,
                "message": "The selected post comment(s) does not exist!",

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

module.exports = {
    fetchAllComments: fetchAllComments,
    store: store,
    fetchCommentById: fetchCommentById,
    updateComment: updateComment,
    fetchPostComments: fetchPostComments,
    deleteComment: deleteComment
}