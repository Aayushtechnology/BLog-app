const express = require("express");
const jwt = require("jsonwebtoken")
const User = require("../model/usermodel")

const isAuthention = async (req, res, next) => {
   
    console.log("isAuthention middleware called");
    // yaha ma token verify garne code halne
    // for now, ma assume garxu token valid xa vanera

    const token = req.headers.autherization;
    console.log("Token:", token);
    if (!token) {
        return res.status(401).json({
            message: "Authention token is missing"
        })
    }
// token verify garne
     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const doesUserExist = await User.findOne({ _id: decode.id })
    next();
}

module.exports = isAuthention;