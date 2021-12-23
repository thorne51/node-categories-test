const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { factory } = require('fakingoose');

const expect = chai.expect;
const readCategory = require('../controllers/readCategory').readCategory;
const readCategories = require('../controllers/readCategory').readCategories;
const db = require('./db');
const Category = require('../models/category');
chai.use(chaiAsPromised);
const categoryFactory = factory(Category);

describe('Read category', () => {
    before(async () => await db.connect());
    afterEach(async () => await db.clearDatabase());
    after(async () => await db.closeDatabase());

    it('should retrieve a category', async () => {
        const expected = await Category.create(categoryFactory.generate());
        const actual = await readCategory(expected._id);

        console.log(expected.toJSON(), actual.toJSON());

        expect(actual.locale[0].title).to.be.equal(expected.locale[0].title);
        expect(actual.slug).to.be.equal(expected.slug);
    });

    it('should retrieve the correct amount of categories', async () => {
        for (let i = 0; i < 500; i++) {
            await Category.create(categoryFactory.generate());
        }

        let results;
        results = await readCategories(1, 10);

        expect(results.previous).to.be.false;
        expect(results.next).to.be.true;
        expect(results.categories).to.have.length(10);

        results = await readCategories(2, 10);
        expect(results.previous).to.be.true;

        results = await readCategories(1, 500);
        expect(results.next).to.be.false;
    });
});