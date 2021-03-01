export default {
    mailgun: {
        domain : 'mail.tarzax.com',
        apiKey : process.env.MAILGUN_API_KEY,
        fromPayslip : 'Tarzax <payslip@tarzax.com>'
    },
    mailtrap: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASSWORD
        }
    },
    gmail: {
        service: "gmail",
        auth: {
            user: process.env.APP_EMAIL, //youremail@gmail.com
            pass: process.env.APP_EMAIL_PASSWORD // Password
        },
        tls: {
            rejectUnauthorized: false,
        }
    },
    ethereal: {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.ETHEREAL_USER, // generated ethereal user
            pass: process.env.ETHEREAL_PASSWORD // generated ethereal password
        },
    },
    tarzax: {
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
    }
};