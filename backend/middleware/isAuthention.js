const express = require("express");
const jwt = require("jsonwebtoken")
const User = require("../model/usermodel")

const isAuthention = async (req, res, next) => {

    console.log("isAuthention middleware called");

    const token = req.headers.authorization;
    console.log("Token:", token);
    if (!token) {
        return res.status(401).json({
            message: "Authentication token is missing"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "hello@33rwcfd,.dhh");
        const doesUserExist = await User.findOne({ _id: decoded.id })

        if (!doesUserExist) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = doesUserExist;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = isAuthention;
