const mongoose = require('mongoose');
const colors=require('colors');
const dbConfig = require("./config.js");

const connectDB = async () => {
    mongoose.set('useCreateIndex', true);
    const connection = await mongoose.connect(dbConfig.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected :)`.blue);
}; 

module.exports = connectDB;