const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongodb;

// connect to db
module.exports.connect = async () => {
    mongodb = await MongoMemoryServer.create();
    const uri = mongodb.getUri();
    await mongoose.connect(uri);
};

// disconnect and close connection
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongodb.stop();
};

// clear the db, remove all data
module.exports.clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};