const nodemailer = require("nodemailer")

// nodemerail use garera email pathaune function
const sendEmail = async (optional) => {
    var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.user_email,
            pass: process.env.user_pass
            
        }
    })


 const mailoptions = {
        from: `"tShirtHub" <${process.env.user_email}>`,
        to: optional.email,
        subject: optional.subject,
        text: optional.message
    };

    await transport.sendMail(mailoptions)

}

module.exports = sendEmail;































// const nodemailer = require ("nodemailer");

// const sendEmail = async (optional) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "aayushtamrakar32@gmail.com",
//                 pass: "nblaitexhaykvcbs",
//             },
//           });

//             // auth: {
//             //     user: "aayustamrkar32@gamil.com",

                
//             //     pass: "cpsqbeazvbidhppt"                  // App Password (not Gmail password)
//             // }
//         // });
//         const mailoptions = {
//             from: "tShirtHub <tshirthub@gmail.com",
//             to: optional.email,
//             subject: optional.subject,
//             text: optional.message
//         };

//         await transport.sendMail(mailoptions)

//     }
     
//     //  module.exports = sendEmail
//         // const mailOptions = {
//         //     from: `"tShirtHub" <aayushtamrakar32@gmail.com>`,  // must be same user
//         //     to: optional.email,
//         //     subject: optional.subject,
//         //     text: optional.message,
//         // };

//     //     await transporter.sendMail(mailOptions);
//     //     console.log("Email sent ✔");


//     // } catch (error) {
//     //     console.error("Email send failed ❌", error);
//     // }
// // };

// module.exports = sendEmail;

