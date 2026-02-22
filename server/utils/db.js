const mongoose  = require('mongoose');
require('dotenv').config();

const MONGODB_URL = process.env.MONGODB;
const dbConnection = async()=>{
    try {
      await mongoose.connect(MONGODB_URL);
      console.log("Connected to DB...")
    } catch (error) {
      console.log("err: ",error.message);
    }
}

module.exports = dbConnection;