const mongoose = require("mongoose");
const connectToMongo = async () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error);
    }
};
module.exports = connectToMongo;