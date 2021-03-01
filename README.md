# Employee Monthly Payslip Generator API

Generate a Employee monthly payslip and send to mail

To Run Server: `npm run start`

To Run Development: `npm run dev`

Method: Post

Url: <http://localhost:3000/employee>

Request Body:

```json
{ "first-name" : "John","last-name" : "Miller","annual-salary" : 190000,"super-rate" : 9,"payment-start-date" : "01 March - 31 March"}
```

```shell
curl -H "Content-Type: application/json" -X POST -d '{ "firstName" : "John","lastName" : "Miller","annualSalary" : 190000,"superRate" : 9,"paymentStartDate" : "01 March - 31 March"}' http://localhost:3000/employee
```

Reference

<https://jsreport.net/learn/base>

<https://www.npmjs.com/package/phantom-html-to-pdf>

<https://www.npmjs.com/package/html-pdf>

<https://github.com/marcbachmann/node-html-pdf>

puppeteer must be this version `"puppeteer": "^2.0.0"`



Earnings
```
Basic pay
Dearness Allowance
Medical Allowance
Overtime
House Rent  Allowance
Conveyance Allowance
Leave travel Allowance
Performance Bonus
Special Allowance
Lunch Allowance
Telephone Allowance
```

Deductions
Provident Fund -  12% Basic salary
Professinal Tax - Its a state tax applicable in only certain states
Income Tax - Tentative tax every month based on your tax saving declaration

Payslip for march 2021

Dear paalamugan,

We attach a march 2021 payslip below, 

