require("dotenv").config();
const express = require('express');
const app = express();
const connectToMongo = require('./db');

//connect to cluster
connectToMongo();
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000');
});