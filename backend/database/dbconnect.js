

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../model/usermodel");

dotenv.config();

const databaseConnect = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected sucessfully ");


    
};

module.exports = databaseConnect;