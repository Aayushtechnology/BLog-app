const User = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../service/sendEmail");

exports.registerUser = async (req, res) => {
    const { username, email, userNumber, password } = req.body

    if (!username || !email || !userNumber || !password) {
        return res.status(400).json({
            message: "please provide username, email, userNumber, password"
        })
    }

    try {
        const userFound = await User.find({ userEmail: email })

        if (userFound.length > 0) {
            return res.status(400).json({
                message: "user with that email already registered",
                data: []
            })
        }

        const userData = await User.create({
            userName: username,
            userEmail: email,
            userNumber: userNumber,
            userPassword: bcrypt.hashSync(password, 10)
        })

        return res.status(201).json({
            message: "registration successfully",
            data: userData
        })
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message)
            return res.status(400).json({ message: messages.join('; ') })
        }
        console.error('registerUser error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "email, password must be provided"
        })
    }

    const userFound = await User.find({ userEmail: email })
    if (userFound.length == 0) {
        return res.status(400).json({
            message: "this email is not registered"
        })
    }

    const isMatched = bcrypt.compareSync(password, userFound[0].userPassword)

    if (isMatched) {
        const token = jwt.sign({ id: userFound[0]._id }, process.env.JWT_SECRET_KEY || "hello@33rwcfd,.dhh", {
            expiresIn: "30d"
        })

        return res.status(200).json({
            message: "user logged in successfully",
            data: userFound[0],
            token: token
        })
    } else {
        return res.status(400).json({
            message: "Invalid password"
        })
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            message: "please provide email"
        })
    }

    const userExist = await User.find({ userEmail: email })

    if (userExist.length === 0) {
        return res.status(400).json({
            message: "user email is not registered"
        })
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    userExist[0].otp = otp
    userExist[0].isOtpVerified = false
    await userExist[0].save()

    await sendEmail({
        email: email,
        subject: "verification otp",
        message: "your otp is: " + otp
    })

    return res.status(200).json({
        message: "OTP sent successfully",
    })
}

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body

    if (!email || !otp) {
        return res.status(400).json({
            message: "email and otp must be provided"
        })
    }

    const userExists = await User.find({ userEmail: email }).select("+otp +isOtpVerified")

    if (userExists.length === 0) {
        return res.status(400).json({
            message: "email is not registered"
        })
    }

    if (userExists[0].otp !== parseInt(otp)) {
        return res.status(404).json({
            message: "Invalid OTP"
        })
    } else {
        userExists[0].otp = undefined
        userExists[0].isOtpVerified = true
        await userExists[0].save()

        return res.status(200).json({
            message: "OTP verified successfully"
        })
    }
}

exports.ResetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body

    if (!email || !newPassword || !confirmPassword) {
        return res.status(400).json({
            message: "please provide email, newPassword, confirmPassword"
        })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: "passwords do not match"
        })
    }

    const userExist = await User.find({ userEmail: email }).select("+isOtpVerified")

    if (userExist.length == 0) {
        return res.status(404).json({
            message: "user email is not registered"
        })
    }

    if (userExist[0].isOtpVerified !== true) {
        return res.status(400).json({
            message: "OTP is not verified"
        })
    }

    userExist[0].userPassword = bcrypt.hashSync(newPassword, 10)
    userExist[0].otp = undefined
    userExist[0].isOtpVerified = false
    await userExist[0].save()

    res.status(200).json({
        message: "Password reset successfully"
    })
}
