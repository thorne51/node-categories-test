const Category = require('../models/category');

module.exports.deleteCategory = async function(id) {
    return Category.findByIdAndDelete(id);
};