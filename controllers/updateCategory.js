const Category = require('../models/category');

module.exports.patchCategory = async function(id, data) {
    await Category.findByIdAndUpdate(id, data, { runValidators: true });

    // reload data
    return Category.findById(id);
};