import _ from 'lodash';
import moment from 'moment';
import nodemailer from 'nodemailer';
import { htmlToText } from 'nodemailer-html-to-text';
import Mailgun from 'mailgun-js';
import config from './config';
import renderEmailTemplate from '../email-templates';
import renderPdfTemplate from '../pdf-templates';

let mailer = {
    from: '"Tarzax" <payslip@tarzax.com>',
    smtp: config.ethereal
};

if (config.mailtrap.auth.user) {
    mailer.smtp = config.mailtrap;
} else if (config.gmail.auth.user) {
    mailer.smtp = config.gmail;
}

let transporter;
let mailgun;

if (process.env.NODE_ENV === 'production') { 
    mailgun = new Mailgun({
        apikey: config.mailgun.apiKey,
        domain: config.mailgun.domain
    });
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
                    resolve(info);
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
    let pdfData = body.pdfData || {};

    let options = {
        from: mailer.from,
        to: body.to,
        subject: body.subject,
        'o:tag': ['Payslip'],
    };

    options.attachments =  [{
        filename: `payslip-${moment().format('MMM-YYYY').toLowerCase()}.pdf`,
        content: null,
        type: 'application/pdf',
        disposition: 'attachment'
    }];

    try {
        options.attachments[0].content = await renderPdfTemplate('standard-payslip', pdfData);
        options.html = await renderEmailTemplate('payslip', data);
    } catch (err) {
        throw err;
    }

    if (body.cc) {
        options.cc = body.cc;
    }

   return send(options);
};
