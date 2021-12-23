const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = chai.expect;
const createCategory = require('../controllers/createCategory').createCategory;
const db = require('./db');

chai.use(chaiAsPromised)

describe('Create category', () => {
    before(async () => await db.connect());
    afterEach(async () => await db.clearDatabase());
    after(async () => await db.closeDatabase());

    it('should create category successfully', async () => {
        const cat = await createCategory({
            slug: 'test-slug',
            is_indexed: true,
            locks: {},
            settings: {
                age_rating: 'A',
                is_premium: false,
            },
            media: {},
            locale: {
                specify_seo_values: false,
                title: 'test title',
                description: 'test description',
                summary: 'test summary',
                language_iso: 'en_ZA',
            },
        });

        expect(cat.slug).to.be.equal('test-slug');
        expect(cat.is_indexed).to.be.true;
        expect(cat.locale[0].title).to.be.equal('test title');
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