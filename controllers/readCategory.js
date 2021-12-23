const Category = require('../models/category');

module.exports.readCategory = async function(id) {
    const category = await Category.findById(id);

    if (null === category) {
        throw new Error(`Category ${id} not found`);
    }

    return category;
};

module.exports.readCategories = async function(page, limit) {
    const result = {};
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (endIndex < (await Category.countDocuments().exec())) {
        result.next = true;
    }

    if (startIndex > 0) {
        result.previous = true;
    }

    result.categories = await Category.find()
        .limit(limit)
        .skip(startIndex);

    return result;
};