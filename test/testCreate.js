const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const createCategory = require('../controllers/createCategory').createCategory;
const db = require('./db');
const faker = require('faker');

chai.use(chaiAsPromised)

describe('Create category', () => {
    before(async () => await db.connect());
    afterEach(async () => await db.clearDatabase());
    after(async () => await db.closeDatabase());

    it('should create category successfully', async () => {
        const title = faker.lorem.words(5);
        const slug = faker.helpers.slugify(title);
        const is_indexed = faker.datatype.boolean();

        const cat = await createCategory({
            slug,
            is_indexed,
            locks: {},
            settings: {
                age_rating: 'A',
                is_premium: false,
            },
            media: {},
            locale: {
                specify_seo_values: false,
                title,
                description: 'test description',
                summary: 'test summary',
                language_iso: 'en_ZA',
            },
        });

        expect(cat.slug).to.be.equal(slug);
        expect(cat.is_indexed).to.be.equal(is_indexed);
        expect(cat.locale[0].title).to.be.equal(title);
        expect(cat.isNew).to.be.false;
    });

    it('should validate that there is at least one locale', async () => {
        const catPromise = createCategory({
            slug: 'test-slug',
            is_indexed: true,
            locks: {},
            settings: {
                age_rating: 'A',
                is_premium: false,
            },
            media: {},
            locale: [],
        });
        expect(catPromise).to.eventually.be.rejected;
    });
});