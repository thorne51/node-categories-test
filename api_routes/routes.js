'use strict';

const controller = require('../controllers/category');

module.exports = (app) => {
    app.route('/categories').post(controller.createCategory);
    app.route('/categories/:id').get(controller.getCategory);
    app.route('/categories').get(controller.getCategories);
    app.route('/categories/:id').patch(controller.patchCategory);
    app.route('/categories/:id').delete(controller.deleteCategory);
};