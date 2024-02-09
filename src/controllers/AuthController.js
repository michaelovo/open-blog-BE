const models = require('../models');
const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



function register(req, res) {

    models.User.findOne({ where: { email: req.body.email } }).then(result => {
        if (result) {
            res.status(409).json({
                "message": "Email already exist!",
            });
        } else {
            bcryptjs.genSalt(10, function (err, salt) {

                bcryptjs.hash(req.body.password, salt, function (err, hash) {

                    const user = {
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        username: req.body.username,
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
                        password: hash,
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

    });

}


module.exports = {
    register: register
}