const models = require('../models');

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
    const category = {
        "name": req.body.name
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