import express from 'express';
import moment from 'moment';
import { sendPayslipMail } from '../common';

const router = express.Router();

function getName(){
	return this.firstName + ' ' + this.lastName;
}

function getGrossIncome(){
	return this.annualSalary/12;
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
	var income = this.annualSalary;
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
			return this.paymentStartDate;
}


router.get('/', (req, res, next) => {
    return res.send('Ok');
});

router.post('/payslip', async (req, res, next) => {

    let currentMonth =  moment().format("MMMM YYYY");
    let pdfData = {};

    pdfData.name = getName.call(req.body);
    pdfData.payPeriod = getCalenderMonth.call(req.body);
    pdfData.grossIncome = parseInt(getGrossIncome.call(req.body));
    pdfData.incomeTax = parseInt(getIncomeTax.call(req.body));
    pdfData.netIncome = parseInt(pdfData.grossIncome - pdfData.incomeTax);
    pdfData.superAmount = parseInt(Math.round(pdfData.grossIncome * req.body.superRate/100));


    pdfData.currentMonth = moment().format("MMMM, YYYY");
    pdfData.company = {};
    pdfData.company.name = "Tarzax Technology";
    pdfData.company.address = "120, N-Block, 28 street, mylapore, chennai: 600049";

    let emailData = {
        subject: `${pdfData.company.name.split(' ')[0]} payslip for ${currentMonth}`,
        employeeName: pdfData.name,
        currentMonth: currentMonth
    };

    let options = {
        subject: emailData.subject,
        to: "paalamugan44@gmail.com",
        data: emailData,
        pdfData: pdfData
    };

    try {
        await sendPayslipMail(options);
        res.send(`${ pdfData.name } payslip successfully sent.`);
    } catch (err) {
        return next(err);
    }

});

export default router;
