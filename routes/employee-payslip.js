var express = require('express');
var moment      = require('moment');
var nodemailer  = require("nodemailer");
var htmlToText  = require("nodemailer-html-to-text").htmlToText;
// var pdf = require("pdf-creator-node");
var pdf = require('html-pdf');
var fs = require('fs');
var path = require('path');
var phantom = require('phantom');
var jsreport = require('jsreport-core')();

var router = express.Router();

var jsReportInitialized = false;

function checkIfJsReportIsInit() {

   if( !jsReportInitialized ) {
       jsReportInitialized = true;
       return jsreport.init();
   }
   return Promise.resolve();
}

function getName(){
  return this['firstName'] + ' ' + this['lastName'];
}

function getGrossIncome(){
  return this['annualSalary']/12;
}

function getIncomeTax(){

    /**
     * 0 - $18,200 Nil
     * $18,201 - $37,000 19c for each $1 over $18,200
     * $37,001 - $80,000 $3,572 plus 32.5c for each $1 over $37,000
     * $80,001 - $180,000 $17,547 plus 37c for each $1 over $80,000
     * $180,001 and over $54,547 plus 45c for each $1 over $180,000
     */

  // var incomeTax = 0;
  // var cCount = 0;
  var income = this['annualSalary'];
  // if(income <= 18200){
  //    incomeTax = 0;
  // }
  // else if(income <= 37000){
  //   income = income - 18200;
  //   cCount = (income*0.19);
  //   incomeTax = Math.round(cCount/12);
  // }
  // else if(income <= 87000){
  //   income = income - 37000;
  //   cCount = (income*0.325) + 3572;
  //   incomeTax = Math.round(cCount/12);
  // }
  // else if(income <= 180000){
  //   income = income - 87000;
  //   cCount = (income*0.37) + 19822;
  //   incomeTax = Math.round(cCount/12);
  // }
  // else{
  //   income = income - 180000;
  //   cCount = (income*0.45) + 54232;
  //   incomeTax = Math.round(cCount/12);
  // }
  // return incomeTax;

   if (income >= 0 && income <= 18200) {
      return 0;
    } else if (income >= 18201 && income <= 37000) {
      return Math.round(((income - 18200) * 0.19) / 12);
    } else if (income >= 37001 && income <= 80000) {
      return Math.round((3572 + (income - 37000) * 0.325) / 12);
    } else if (income >= 80001 && income <= 180000) {
      return Math.round((17547 + (income - 80000) * 0.37) / 12);
    } else if (income >= 180001) {
      return Math.round((54547 + (income - 180000) * 0.45) / 12);
    }
}

function getCalenderMonth(){

//   const monthNames = ["january", "february", "march", "april", "may", "june",
//   "july", "august", "september", "october", "november", "december","january"
// ];

//   let date = new Date(this['paymentStartDate']);
//   let date1 = new Date('01-'+monthNames[date.getMonth()+1]+'-'+date.getFullYear());
//   return this['paymentStartDate'].substr(0,2) + ' ' + monthNames[date.getMonth()] + ' , ' +date.getFullYear()+ '  -  ' +
//          date1.getUTCDate() + ' ' + monthNames[date.getMonth()] + ' , ' +date.getFullYear();
      return this['paymentStartDate'];
}

var mailer = {
    from: "paalamugan26@gmail.com",
    smtp: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "1e96679b9a1c9b",
            pass: "fbfedcc63376bd"
        }
    }
}

var subject = "Employee Payslip";
var to = "paalamugan@atatus.com";

let send = function(recipients, subject, body, cb) {

    console.info(`Sending email to ${recipients} with subject ${subject}...`);

    let mailOptions = {
        from: mailer.from,
        to: recipients,
        subject: subject,
        html: body,
        attachments: [
            {
                name: 'payslip.pdf',
                path: 'path'
            }
        ]
    };

    let transporter = nodemailer.createTransport(mailer.smtp);

    if (transporter) {
        transporter.use("compile", htmlToText());
        transporter.sendMail(mailOptions, (err, info) => {
            if (err)
                console.warn("Unable to send email: ", err);
            else
                console.info("Email message sent.", info.response);

            if (cb)
                cb(err, info);
        });
    }
    else {
        console.warn("Unable to send email! Invalid mailer transport: stmp" );
    }
}

router.post('/', function(req, res, next) {

    res.locals.year = moment().format("YYYY");
    res.locals.title = "Namlabs";

    let data = {};

    data.name = getName.call(req.body);
    data.payPeriod = getCalenderMonth.call(req.body);
    data.grossIncome = parseInt(getGrossIncome.call(req.body));
    data.incomeTax = parseInt(getIncomeTax.call(req.body));
    data.netIncome = parseInt(data.grossIncome - data.incomeTax);
    data.superAmount = parseInt(Math.round(data.grossIncome * req.body.superRate/100));


    data.currentMonth = moment().format("MMMM YYYY");
    data.company = {};
    data.company.name = "Namlabs Technology Pvt. Ltd";
    data.company.address = "120, N-Block, 28 street, mylapore, chennai:600049";

    var html = fs.readFileSync(__dirname + '/template.html', "utf-8");

    var doc = {
        data: {},
        path: "./output.pdf"
    };
    var base = path.join(__dirname,"..")

    var options = {
        height: "10.5in",
        width: "10in",
        border: "5mm",
    };


    res.render("payslip-pdf", data, function(err, html) {

        if (err){
            console.log("err", err)
            return next(err);
        }

        return checkIfJsReportIsInit().then(() => {
            return jsreport.render({
                template: {
                    content: html,
                    recipe: 'chrome-pdf',
                    engine: 'none',
                    chrome: {
                        format: "A4",
                        printBackground: true,
                        marginTop: '0.5in',
                        marginRight: '0.25in',
                        marginBottom: '0.25in',
                        marginLeft: '0.25in'
                    },
                }
            })
        }).then((resp) => {
            fs.writeFileSync(base+'/report.pdf', resp.content);
            res.sendStatus(200);
        })


        // phantom.create().then(function(ph) {
        //     ph.createPage().then(function(page) {
        //         page.open("http://localhost:3000").then(function(status) {
        //             page.render('payslip.pdf').then(function() {
        //                 console.log('Page Rendered');
        //                 res.send("Ok");
        //                 ph.exit();
        //             });
        //         });
        //     });
        // });
        // pdf.create(html, options).toFile('./output.pdf', function(err, resp) {
        //     if (err) return console.log(err);
        //     console.log(resp); // { filename: '/app/businesscard.pdf' }
        //     res.send("Ok");
        // });
        // pdf.create(doc, options)
        // .then(resoponse => {
        //         console.log(resoponse);
        //         res.send("Ok");
        //     })
        // .catch(error => {
        //         console.error(error)
        // });
        // send(to, subject, html, function(err, info) {

        //     if (err) {
        //         console.log("error", err)
        //     }

        //     res.send(info);
        // });
    });
});

module.exports = router;
