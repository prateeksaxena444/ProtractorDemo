var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
	host: 'smtp.outlook.com', // host address
	port: 587,  // mostly same number, rarely changes
	secure: false, // true for 465, false for other ports
	auth: {
		user: 'psaxena@yotta.com', // generated ethereal user
		pass: 'Admin@123' // generated ethereal password
	}
});

/*var transport = nodemailer.createTransport({
	//service: 'Gmail',
    auth: {
        user: "psaxena@yotta.com",
        pass: "Admin@123"
    }
});*/

var mailOptions = {
    from: 'psaxena@yotta.com', // sender address
    to: 'psaxena@yotta.com', // list of receivers
    subject: 'Automation Result', // Subject line
	//text: info.body,
    text: 'This is an automatic mail generated for testing purpose please ignore this mail. Contains the test result for the regression test in html file', // plaintext body
    attachments: [
        {
            'path': '../target/ProtractorTestReport.html',
        }]
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
		//response.send(err);
    } else {
        console.log("Message sent: " + info.response);
		//response.send(info);
    }
});