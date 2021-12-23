const Category = require('../models/category');

module.exports.createCategory = async function(data) {
    // check for existing category with slug
    const existing = await Category.findOne({ slug: data.slug });
    if (existing) {
        throw new Error(`A category with slug ${data.slug} already exists`);
    }

    return await Category.create(data);
};