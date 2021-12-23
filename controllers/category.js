'use strict';

const createCategory = require('./createCategory');
const readCategory = require('./readCategory');
const updateCategory = require('./updateCategory');
const deleteCategory = require('./deleteCategory');

const controllers = {
    createCategory: async (req, res) => {
        try {
            res.send(await createCategory.createCategory(req.body));
        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    },

    getCategory: async (req, res) => {
        try {
            res.send(await readCategory.readCategory(req.params.id));
        } catch (err) {
            res.status(404).json({
                message: err.message,
            });
        }
    },

    getCategories: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        if (limit > 200) {
            limit = 200; // don't allow more than 200 (resource protection)
        }

        try {
            res.send(await readCategory.readCategories(page, limit));
        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    },

    patchCategory: async (req, res) => {
        try {
            res.send(await updateCategory.patchCategory(req.params.id, req.body));
        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            await deleteCategory.deleteCategory(req.param.id);
            res.send({
                message: `Category ${req.param.id} deleted`,
            });
        } catch (err) {
            res.status(404).json({
                message: err.message,
            });
        }
    },
};

module.exports = controllers;