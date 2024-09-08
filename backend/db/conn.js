const mongoose = require("mongoose");
const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database connection done")
        })
        .catch((err) => {
            console.log("No Database connection")
        })
}

module.exports = connectDB