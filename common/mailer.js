import _ from 'lodash';
import moment from 'moment';
import nodemailer from 'nodemailer';
import { htmlToText } from 'nodemailer-html-to-text';
import Mailgun from 'mailgun-js';
import config from '../config';
import renderEmailTemplate from '../email-templates';

let mailer = {
    from: '"Tarzax" <payslip@tarzax.com>',
    smtp: config.ethereal // all emails are catched by ethereal.email
};

if (config.mailtrap.auth.user) {
    mailer.smtp = config.mailtrap;
} else if (config.gmail.auth.user) {
    mailer.smtp = config.gmail;
}

let transporter;
let mailgun;
let sendgrid;

if (process.env.NODE_ENV === 'production') {
    if (config.mailgun.apiKey) {
        mailgun = new Mailgun({
            apikey: config.mailgun.apiKey,
            domain: config.mailgun.domain
        });
    } else if (config.sendgrid.auth.user) {
        // logic for sendgrid email service provider.
    } else {
        transporter = nodemailer.createTransport(mailer.smtp);
    }

} else if (process.env.NODE_ENV === 'development') {
    transporter = nodemailer.createTransport(mailer.smtp);
}

const send = (options) => {

    if (mailgun) {
        return new Promise((resolve, reject) => {
            mailgun.messages().send(options, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
    } else if (sendgrid) {
        return sendgrid.send(options);
    }

    if (transporter) {

        transporter.use("compile", htmlToText());

        options.to = _.isArray(options.to) ? options.to[0] : options.to;

        console.log(`Sending email to ${options.to} with subject ${options.subject}...`);

        return new Promise((resolve, reject) => {
            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.warn("Unable to send email: ", err);
                    reject(err);
                } else {
                    console.info("Email message sent.", info.response);

                    if (transporter.options.host.includes('ethereal')) {
                        return resolve({ type: 'ethereal', url: nodemailer.getTestMessageUrl(info) });
                    }
                    return resolve(info);
                }
            });
        });

    }
    else {
        console.warn("Unable to send email! Invalid mailer transport: stmp" );
        return Promise.reject("Unable to send email! Invalid mailer transport: stmp");
    }
};

export const sendPayslipMail = async (body) => {

    let data = body.data || {};
    let pdf = body.pdf || null;

    let options = {
        from: body.from || mailer.from,
        to: body.to,
        subject: body.subject,
        'o:tag': ['Payslip'],
    };

    if (pdf) {
        options.attachments =  [{
            filename: pdf.fileName,
            content: pdf.content,
            type: 'application/pdf',
            disposition: 'attachment'
        }];
    }


    try {
        options.html = await renderEmailTemplate('payslip', data);
    } catch (err) {
        throw err;
    }

    if (body.cc) {
        options.cc = body.cc;
    }

   return send(options);
};
