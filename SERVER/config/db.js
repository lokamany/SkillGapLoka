const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Ensure your .env has MONGO_URI defined
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;