const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/voosh")
        .then(() => {
            console.log("Database connection done")
        })
        .catch((err) => {
            console.log("No Database connection")
        })
}

module.exports = connectDB