import _ from 'lodash';
import nodemailer from 'nodemailer';
import { htmlToText } from 'nodemailer-html-to-text';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import config from '../config';
import renderEmailTemplate from '../email-templates';

let mailer = {
    from: '"Employee Payslip" <hello@paalamugan.com>',
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
        const Mailgun = require("mailgun.js");
        const mg =  new Mailgun(formData);
        mailgun = mg.client({ username: 'api', key:  config.mailgun.apiKey });
    } else if (config.sendgrid.apiKey) {
        sendgrid = require('@sendgrid/mail');
        sendgrid.setApiKey(config.sendgrid.apiKey);
    } else {
        transporter = nodemailer.createTransport(mailer.smtp);
    }

} else if (process.env.NODE_ENV === 'development') {
    transporter = nodemailer.createTransport(mailer.smtp);
}

const send = (options) => {

    if (mailgun) {
        return mailgun.messages.create(config.mailgun.domain, options);
    }

    if (sendgrid) {
        return new Promise((resolve, reject) => {

            if (options.attachments && options.attachments.length) {
                options.attachments[0].content = options.attachments[0].content.toString('base64');
            }
            
            sendgrid.send(options, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({});
                }
            });
        });
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

                    if (transporter.options &&
                        transporter.options.host &&
                        transporter.options.host.includes('ethereal')) {
                        return resolve({ type: 'ethereal', url: nodemailer.getTestMessageUrl(info) });
                    }

                    return resolve(info);
                }
            });
        });

    } else {
        console.warn("Unable to send email! Invalid mailer transport: stmp");
        return Promise.reject("Unable to send email! Invalid mailer transport: stmp");
    }
};

export const sendPayslipMail = async(body) => {

    let data = body.data || {};
    let pdf = body.pdf || null;

    let options = {
        from: body.from || mailer.from,
        to: body.to,
        subject: body.subject,
        'o:tag': ['payslip'],
    };

    if (pdf) {
        options.attachments = [{
            content: pdf.content,
            filename: pdf.fileName,
            type: 'application/pdf',
            disposition: 'attachment'
        }];
    }

    options.html = await renderEmailTemplate('payslip', data);

    if (body.cc) {
        options.cc = body.cc;
    }

    return send(options);
};