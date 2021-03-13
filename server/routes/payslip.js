import express from 'express';
import moment from 'moment';
import fs from 'fs';
import _ from 'lodash';
import { sendPayslipMail } from '../common';
import renderPdfTemplate from '../pdf-templates';

const router = express.Router();

const getTotalAmount = function (type) {

    let rows = this[type];
    let total = 0;

    if (rows && rows.length) {
        total += _.sumBy(rows, (row) => +(row.amount));
    }

    return total;

}

const getGrossIncome = function () {
    return getTotalAmount.call(this, 'earnings') + getTotalAmount.call(this, 'reimbursements');
}

const getGrossAnnualIncome = function () {
    return (getGrossIncome.call(this) * 12);
}

const getTotalNetIncome = function () {
    return getGrossIncome.call(this) - getTotalAmount.call(this, 'deductions');
}

const findIncomeTaxRow = function () {
    return _.find(this.deductions, (deduction) => (deduction.name.replace(/\s+/g, '').toLowerCase() === 'incometax'))
}

const getIncomeTax = function () {

/*
    Income Slab                 Tax Rate
    Up to  2.5 lakhs            None
    2.5 lakhs – 5 lakhs         10% of exceeding amount
    5 lakhs – 10 lakhs          20% of the exceeding amount
    Above 10 lakhs              30% of the exceeding amount
*/
    let incomeTax = 0; // if less than 250000 lakhs income tax is 0.

    let grossAnnualIncome = getGrossAnnualIncome.call(this) - getTotalAmount.call(this, 'deductions');
    let incomeTaxRow = findIncomeTaxRow.call(this);

    if (incomeTaxRow) {
        grossAnnualIncome = grossAnnualIncome - incomeTaxRow.amount
    }

    if (grossAnnualIncome >= 250000 && grossAnnualIncome < 500000) {
        incomeTax = grossAnnualIncome * 10 / 100;
    } else if (grossAnnualIncome >= 500000 && grossAnnualIncome < 1000000) {
        incomeTax = grossAnnualIncome * 20 / 100;
    } else {
        incomeTax = grossAnnualIncome * 30 / 100;
    }

    return (incomeTax / 12);
}

router.post('/', async (req, res, next) => {

    let imageBase64 = null;
    let error = null;
    let body = req.body || {};

    if (req.file) {
        imageBase64 = req.file.buffer.toString('base64');
    }

    let generatedMonth =  moment().format("MMMM YYYY");

    body.generatedMonth = moment().format("MMMM, YYYY");
    body.companyIconUrl = imageBase64 ? `data:${req.file.mimetype};base64,${imageBase64}` : body.companyIconUrl;
    body.employeeJoiningDate = body.employeeJoiningDate ? moment(body.employeeJoiningDate).format('DD-MM-YYYY') : '';

    body.earnings = body.earnings ? JSON.parse(body.earnings) : [];
    body.deductions = body.deductions ? JSON.parse(body.deductions) : [];
    body.reimbursements = body.reimbursements ? JSON.parse(body.reimbursements) : [];

    if (!body.companyName) {
        error = "Company name is missing!";
    } else if (!body.companyAddress) {
        error = "Company address is missing!";
    }  else if (!body.employeeName) {
        error = "Employee name is missing!";
    } else if (!body.employeeEmail) {
        error = "Employee email is missing!";
    } else if (!body.employeePosition) {
        error = "Employee position is missing!";
    } else if (!body.earnings.length) {
        error = "Employee earnings values is missing!";
    } else if (body.earnings.length && !body.earnings[0].name) {
        error = "Wrong employee earnings values. Values must be array of object. Object like { name: 'Basic', amount: 10000 }";
    }

    if (error) {
        return next(new Error(error));
    }

    let incomeTaxRow = findIncomeTaxRow.call(body);

    if (!incomeTaxRow) {

        incomeTaxRow = {
            name: 'Income Tax',
            amount: getIncomeTax.call(body)
        }

        body.deductions.push(incomeTaxRow);

    }

    body.totalEarnings = getTotalAmount.call(body, 'earnings');
    body.totalReimbursements = getTotalAmount.call(body, 'reimbursements');
    body.totalDeductions = getTotalAmount.call(body, 'deductions');

    body.earningAndDeductions = [];

    _.forEach(body.earnings, function(earning, index) {

        let obj = {
            earningName: earning.name,
            earningAmount: earning.amount,
            deductionName: '',
            deductionAmount: ''
        }

        let deduction = body.deductions[index];

        if (deduction) {
            obj.deductionName = deduction.name;
            obj.deductionAmount = deduction.amount;
        }

         body.earningAndDeductions.push(obj);
    })

    body.totalNetIncome = getTotalNetIncome.call(body);

    let pdfContent = null;
    let pdfFileName  = `payslip-${_.kebabCase(generatedMonth).toLowerCase()}.pdf`

    try {

        pdfContent = await renderPdfTemplate('standard-payslip', body);

        if (body.type === 'download') {

            res.attachment(pdfFileName);
            return res.send(pdfContent);

        } else if (body.type === 'email') {

            let companyName = body.companyName.split(' ')[0];

            let emailData = {
                title: `${companyName} payslip for ${generatedMonth}`,
                employeeName: body.employeeName,
                generatedMonth: generatedMonth
            };

            let options = {
                subject: emailData.title,
                from: `${companyName} <payslip@${companyName.toLowerCase()}.com>`,
                to: body.employeeEmail || `${body.employeeName.replace(/\s+/g, '').toLowerCase()}@gmail.com`,
                data: emailData,
                pdf: {
                    content: pdfContent,
                    fileName: pdfFileName
                }
            };

            let result = await sendPayslipMail(options);

            return res.json({ success: true, ...result });

        } else {
            return next(new Error('Invalid type. Supported type is email and download'));
        }

    } catch (err) {
        return next(err);
    }

});

export default router;
