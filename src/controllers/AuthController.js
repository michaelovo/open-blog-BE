const models = require('../models');
const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



function register(req, res) {

    /* prevent duplicate email address during signup */
    models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                "message": "Duplicate! Email already exist!",
            });
        } else {
            bcryptjs.genSalt(10, function (err, salt) {

                bcryptjs.hash(req.body.password, salt, function (err, hash) {

                    const user = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: req.body.password,
                        confirmPassword: req.body.confirmPassword
                    }

                    /* Validate payload */
                    const schema = {
                        first_name: "string|max:100|min:2|optional:false|nullable:false",
                        last_name: "string|max:100|min:2|optional:false|nullable:false",
                        username: "string|optional:false|nullable:false|min:3",
                        email: "email|optional:false|nullable:false",
                        phone: "string|optional:false|nullable:false|min:11|max:11",
                        password: "string|min:6|optional:false|nullable:false",
                        confirmPassword: "equal|field:password|value:true|strict:true|optional:false|nullable:false"
                    }
                    const check = new Validator();
                    const validatorResponse = check.validate(user, schema);

                    if (validatorResponse !== true) {
                        return res.status(400).json({
                            "status": false,
                            "message": "Validation failed!",
                            "error": validatorResponse
                        });
                    }

                    /* Create account */
                    models.User.create({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        password: hash,
                        status_id: 1,
                    }).then(result => {
                        res.status(200).json({
                            "status": true,
                            messsage: 'Account created successfully',
                            "user": result
                        });
                    }).catch(error => {
                        res.status(500).json({
                            "status": false,
                            messsage: 'Something went wrong',
                            "error": error
                        });
                    });
                });
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

function login(req, res) {

    /* login payload */
    const payload = {
        email: req.body.email,
        password: req.body.password
    }

    /* Validate payload */
    const schema = {
        email: "email|optional:false|nullable:false",
        password: "string|min:6|optional:false|nullable:false",
    }
    const check = new Validator();
    const validatorResponse = check.validate(payload, schema);

    if (validatorResponse !== true) {
        return res.status(400).json({
            "status": false,
            "message": "Validation failed!",
            "error": validatorResponse
        });
    }

    /* Ensure attempted login user exist and credential matches */
    models.User.findOne({ where: { email: payload.email, status_id: 1 } }).then(user => {
        if (user === null) {
            res.status(401).json({
                "status": false,
                "message": "Invalid credentails",
            });
        } else {
            bcryptjs.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        id: user.id
                    }, process.env.JWT_KEY, function (err, token) {
                        res.status(200).json({
                            "status": true,
                            "message": "Login successful",
                            "user": user,
                            "token": token
                        });
                    })
                } else {
                    res.status(401).json({
                        "status": false,
                        "message": "Invalid credentails",
                    });
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            "status": false,
            "message": "Something went wrong",
            "error": error
        });
    });
}


module.exports = {
    register: register,
    login: login
}