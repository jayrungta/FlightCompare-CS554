const orders = require("./orders");
const nodemailer = require('nodemailer');
/*const credentials = require("./credentials");*/

module.exports = {
    notifyChanges: async (params) => {
        let { flightId } = params;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: credentials.user,
                clientId: credentials.clientId,
                clientSecret: credentials.clientSecret,
                refreshToken: credentials.refreshToken,
                accessToken: credentials.accessToken
            }
        });

        let emailTo = await getNotificationEmails(flightId).toString();
        // setup email data with unicode symbols
        let mailOptions = {
            from: `"Mingwei Xu" <luwanjiu@gmail.com>`, // sender address
            to: emailTo, // list of receivers
            subject: 'Hello ✔',
            text: 'Hello world ?',
            html: '<b>Hello world ?</b>'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
}

async function getNotificationEmails(flightId) {
    let notifyOrders = await orders.getOrdersByFlightAndStatus(flightId, "purchased");
    let notifyEmails = notifyOrders.map(order => order.user.email);
    return notifyEmails;
}
