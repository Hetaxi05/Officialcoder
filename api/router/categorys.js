const Category = require('../model/category');
const express = require('express');
const RouterCategory = express.Router();

// Get all categories
RouterCategory.get('/', (req, res) => {
    Category.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

// Get total number of categories
RouterCategory.get('/count/total', async (req, res) => {
    try {
        const count = await Category.countDocuments();
        res.json({ totalCategories: count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total categories', error });
    }
});

// Get a category by ID
RouterCategory.get('/:id', (req, res) => {
    Category.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

// Add a new category
RouterCategory.post('/add', (req, res) => {
    const newCategory = new Category({
        categoryname: req.body.categoryname,
        tag: req.body.tag,
        icon: req.body.icon
    });
    newCategory.save()
        .then(() => {
            res.json("Inserted successfully");
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

// Update a category by ID
RouterCategory.put('/update/:id', (req, res) => {
    Category.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
        .then(() => {
            res.json('Updated successfully');
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

// Delete a category by ID
RouterCategory.delete('/del/:id', (req, res) => {
    Category.deleteOne({ _id: req.params.id })
        .then(() => {
            res.json('Deleted successfully');
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
});

module.exports = RouterCategory;
