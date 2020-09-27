const nodemailer = require("nodemailer");


module.exports.sendMail = async (to, subject, text) => {

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'muhammad.alimund@gmail.com', // generated ethereal user
            pass: 'Pakistan$1234567890', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻',
        to: to,
        subject: subject,
        text: text,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true

}
