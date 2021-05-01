export default {
    mailgun: { // all emails are delivered to destination (production)
        domain : 'mail.tarzax.com',
        apiKey : process.env.MAILGUN_API_KEY,
        fromPayslip : 'Tarzax <payslip@tarzax.com>'
    },
    sendgrid: { // all emails are delivered to destination (production)
        apiKey: process.env.SENDGRID_API_KEY,
    },
    gmail: { // all emails are delivered to destination by gmail service (development)
        service: "gmail",
        auth: {
            user: process.env.APP_EMAIL, //youremail@gmail.com
            pass: process.env.APP_EMAIL_PASSWORD // Password
        },
        tls: {
            rejectUnauthorized: false,
        }
    },
    mailtrap: { // all emails are catched by mailtrap.io (development)
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD
        }
    },
    ethereal: { // all emails are catched by ethereal.email (development)
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.ETHEREAL_USER, // generated ethereal user
            pass: process.env.ETHEREAL_PASSWORD // generated ethereal password
        },
    },
    tarzax: { /// all emails are delivered to destination by your own domain (development)
        host: "mail.tarzax.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'payslip@tarzax.com',
            pass: '123abc',
        },
        tls: {
            rejectUnauthorized: false,
        },
    },
};