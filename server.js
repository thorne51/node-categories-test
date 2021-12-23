require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./api_routes/routes');
routes(app);
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(dbURL)
    .catch(err => {
        console.log('Cannot connect to MongoDB -> ', err);
    });

app.listen(port, () => {
    console.log(`Listening to port http://localhost:${port}`);
});