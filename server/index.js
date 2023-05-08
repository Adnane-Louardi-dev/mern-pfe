require("dotenv").config();
const cors=require('cors')
const express = require('express');
const app = express();
const connectToMongo = require('./db');
const morgan = require("morgan");
const ministere=require("./routes/partieMinistere")

//connect to cluster
connectToMongo();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use("/ministere",ministere)

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
    console.log('Server listening on port 3000');
});