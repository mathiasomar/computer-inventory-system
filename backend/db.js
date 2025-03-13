const mongoose = require('mongoose');

const connectDB = async (url) => {
    await mongoose.connect(url)
        .then(() => console.log("Connected to mongoDB database...!"))
        .catch((err) => console.log(err))
};

module.exports = connectDB;