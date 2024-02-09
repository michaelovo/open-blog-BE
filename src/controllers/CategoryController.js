const models = require('../models');
const Validator = require('fastest-validator');

function fetchAllCategories(req, res) {
    models.Category.findAll().then(result => {
        res.status(200).json({
            "status": true,
            "message": "Categories retrieved successfully",
            "category": result
        });
    }).catch(error => {
        res.status(500).json({
            "status": true,
            "message": "Something went wrong",
            "error": error
        });
    });
}

function storeCategory(req, res) {

    models.Category.findOne({ where: { name: req.body.name } }).then(result => {
        if (result) {
            res.status(409).json({
                "message": "Duplicate! Name already exist!",
            });
        } else {
            const category = {
                "name": req.body.name
            }

            const schema = {
                name: "string|max:50|min:2|nullable:false|optional:false"
            }
            const check = new Validator();
            const validatorResponse = check.validate(category, schema);

            if (validatorResponse !== true) {
                return res.status(400).json({
                    "status": false,
                    "message": "Validation failed!",
                    "error": validatorResponse
                });
            }

            models.Category.create(category).then(result => {
                res.status(200).json({
                    "status": true,
                    "message": "Category created successfully",
                    "category": result
                });
            }).catch(error => {
                res.status(500).json({
                    "status": true,
                    "message": "Something went wrong",
                    "error": error
                });
            });

        }
    }).catch(error => {

    });

}

function fetchAllCategoryById(req, res) {
    const categoryId = req.params.categoryId;

    models.Category.findByPk(categoryId).then(result => {
        if (result) {
            res.status(200).json({
                "status": true,
                "message": "The selected category does not exist!!",
                "category": result
            });
        }
        res.status(404).json({
            "status": false,
            "message": "The selected category does not exist!!",

        });

    }).catch(error => {
        res.status(500).json({
            "status": false,
            "message": "Something went wrong",
            "error": error
        })
    })
}

function updateCategory(req, res) {
    const categoryId = req.params.categoryId;

    const category = {
        "name": req.body.name
    }

    const schema = {
        name: "string|max:50|min:2|nullable:false|optional:false"
    }
    const check = new Validator();
    const validatorResponse = check.validate(category, schema);

    if (validatorResponse !== true) {
        return res.status(400).json({
            "status": false,
            "message": "Validation failed!",
            "error": validatorResponse
        });
    }

    models.Post.findOne({ where: { id: categoryId } }).then(result => {
        if (result) {
            models.Category.update(category, { where: { id: categoryId } }).then(result => {
                res.status(200).json({
                    "status": true,
                    "message": "Category updated successfully",
                    "category": category
                });
            }).catch(error => {
                res.status(500).json({
                    "status": false,
                    "message": "Something went wrong",
                    "error": error
                });
            });
        } else {
            res.status(404).json({
                "message": "The selected category does not exist!",
            });
        }

    }).catch(error => {

    });

}

function deleteCategory(req, res) {
    const categoryId = req.params.categoryId;

    models.Category.destroy({ where: { id: categoryId } }).then(result => {
        if (result) {
            res.status(200).json({
                "status": true,
                "message": "Category deleted successfully",
            });

        }
        res.status(404).json({
            "status": false,
            "message": "Record does not exist",
        });
    }).catch(error => {
        res.status(500).json({
            "status": false,
            "message": "Something went wrong",
            "error": error
        });
    });

}

module.exports = {
    fetchAllCategories: fetchAllCategories,
    storeCategory: storeCategory,
    fetchAllCategoryById: fetchAllCategoryById,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}