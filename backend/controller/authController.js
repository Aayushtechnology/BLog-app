

exports.registerUser = async (req, res) => {
    // console.log("hello")
    // console.log(req.body);

    // const username = req.body.username
    // const email = req.body.email
    // const userNumber= req.body.userNumber 
    // const password= req.body.password

    // console.log(username, email, userNumber, password)

    //distructure
    const { username, email, userNumber, password } = req.body

    if (!username || !email || !userNumber || !password) {
        return res.status(400).json({
            message: "please provide username, email, userNumber, password"
        })
    }

    // check if that email already exist or not.
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
            message: "registration successully",
            data: userData
        })
    } catch (err) {
        // If mongoose validation error, return 400 with details
        if (err.name === 'ValidationError') {
            // collect messages
            const messages = Object.values(err.errors).map(e => e.message)
            return res.status(400).json({ message: messages.join('; ') })
        }
        // otherwise return generic 500 with message
        console.error('registerUser error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }

}

//login user

exports.loginUser = async (req, res) => {
    // data baody ma ayx 
    const { email, password } = req.body

    // china vne run hux 
    if (!email || !password) {
        return res.status(400).json({
            message: "email, password most be provide"
        })
    }
    // database  ma fund garxa 
    const userFound = await User.find({ userEmail: email })
    if (userFound.length == 0) {
        return res.status(400).json({
            message: "this email is not register"
        })
    }
    // databsae password ra user liw hle ko password vanxa run huxa
    const isMatched = bcrypt.compareSync(password, userFound[0].userPassword)

    // macth vo yo vane yo run huxa
    if (isMatched) {
        // token generate garxa
        const token = jwt.sign({ id: userFound[0]._id }, "hello@33rwcfd,.dhh", {
            expiresIn: "9475858s"
        })

        return res.status(200).json({
            message: "user logged in successfully",
            data: userFound,
            token: token
        })
        // natra 
    } else {
        return res.status(400).json({
            message: "Invalid password"
        })
    }

}

//forgot password

exports.forgotPassword = async (req, res) => {
    // fortnd emil ayxa 
    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            message: "please provide email"
        })
    }
    //  database ma email xa ki nai vanera herxa
    const userExist = await User.find({ userEmail: email })
    // console.log(userExist)

    // 0 xa vnu ko artha email register nai vako xaina vanxa
    if (userExist.length === 0) {
        return res.status(400).json({
            message: "user email is not register"
        })
    }
    // make  otp and 
    // send otp to email
    const otp = Math.floor(1000 + Math.random() * 90000);
    //  user ma otp ra isotpverfied xa

    // otp halxa isotpverfied lai false garxa
    // save garxa
    userExist[0].otp = otp
    userExist[0].isOtpVerified = false
    await userExist[0].save()

    // send email
    await sendEmail({
        email: email,
        subject: "verification otp",
        message: "your otp is: " + otp
    })

    return res.status(200).json({
        message: "OTP send successfully",
    })

}
//verifyotp
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    console.log(email, otp)

    if (!email || !otp) {
        return res.status(400).json({
            message: "email and otp must be provide"
        })
    }
    // database ma email xa ki nai vanera herxa
    const userExists = await User.find({ userEmail: email }).select("+otp +isOtpVerified")

    // console.log(userExist)
    // xa vnu ko artha email register vako xaina vanxa
    if (userExists.length === 0) {
        return res.status(400).json({
            message: "email is not regster"
        })
    }
    // otp milxa ki nai vanera herxa
    if (userExists[0].otp !== otp) {
        return res.status(404).json({
            message: "Inviled Otp"
        })
    } else {
        //  dispost the so connet be used next time  
        userExists[0].otp = undefined
        userExists[0].isOtpVerified = true
        await userExists[0].save()

        return res.status(200).json({
            message: "otp is verify"
        })
    }
}

exports.ResetPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body

    if (!email) {
        return res.status(400).json({
            massage: " please provide email "
        })
    }

    if (!newPassword) {
        return res.status(400).json({
            massage: " please provide newpassword  "
        })
    }
    if (!confirmPassword) {
        return res.status(400).json({
            massage: " please provide confirmpassword  "
        })
    }

    // check  sabai field aayxa ki nai
    //     if(! email|| !newPassword || !confirmPassword){
    //     return res.status(400).json ({
    //         massage : " please provide  emil newpassword , confirmpasswod "
    //     })

    // }  

    //  newpassword ra confirmpassword milxa ki nai vanera herxa
    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            massage: " password dose not match "
        })
    }
    // database ma email xa ki nai vanera herxa
    const userExist = await User.find({ userEmail: email })
    if (userExist.length == 0) {
        return res.status(404).json({
            massage: " user email is not resisterd "
        })
    }
    // otp verify vako ki nai vanera herxa
    if (userExist[0].isOtpVerified === false) {
        return res.status(400).json({
            massage: " otp is not verified "
        })
    }
    // password hash garxa ra save garxa
    userExist[0].userPassword = bcrypt.hashSync(newPassword, 10)
    //  otp ra isotpverfied lai dispost garxa
    userExist[0].otp = undefined
    // 
    userExist[0].isOtpVerified = true
    await userExist[0].save()


    res.status(200).json({
        massage: "sucessfully "
    })
}