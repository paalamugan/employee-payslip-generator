# Employee Monthly Payslip Generator API

Generate a Employee monthly payslip download as pdf and send to mail,

## Only Once

- If `jq` doesn't exist in your machine. use the below command to install it.(Only for linux)

`jq` prettify your json response

```sh
apt install jq
```

## GET STARTED

Node Version:

- node: v14.8.0
- npm: v6.14.7

```sh
nvm use
```

### For Client,

```
cd client
npm install
```

- To run in development,
```
npm run dev
```

- To build for production,
```
npm run build
```

### For Server

```
npm install
```

- To run in development,
```
npm run dev
```

- To run in production,
```
npm run prod
```

### Download PDF or Send to email via curl

- Download as PDF

`companyIcon` or `companyIconUrl` is optional. You can pass it like.

```sh
curl -X POST -F 'companyIcon=@/home/user/Pictures/icon.png'
```
and add rest of the below fields.

```sh
curl -X POST -F 'companyName=Tarzax Technology Pvt ltd.' \
    -F 'companyAddress=250, S-BLock, 27 Street, Adayar, Chennai: 600027' \
    -F 'employeeName=Paalamugan S' \
    -F 'employeeEmail=abc@gmail.com' \
    -F 'employeeId=emp01' \
    -F 'employeePosition=Software Engineer' \
    -F 'employeeJoiningDate=2020-04-08' \
    -F 'employeeUan=201017181120' \
    -F 'employeeAccountNumber=8718927610892' \
    -F 'employeePfAccountNumber=TN/AAA/0000000/000/0000000' \
    -F 'employeePaidDays=28' \
    -F 'employeeLopDays=3' \
    -F 'earnings=[{"name":"Basic pay","amount":25000},{"name":"House Rent Allowance","amount":5000},{"name":"Dearness Allowance","amount":3750}]' \
    -F 'deductions=[{"name":"Provident Fund","amount":3000},{"name":"Income Tax","amount":1250}]' \
    -F 'reimbursements=[{"name":"Medical Reimbursement","amount":5000},{"name":"Telephone Reimbursement","amount":1750},{"name":"Conveyance Reimbursement","amount":500}]' \
    -F 'type=download' \
    --output payslip.pdf \
    http://localhost:3000/api/payslip
```

- Send to email

```sh
curl -X POST -F 'companyName=Tarzax Technology Pvt ltd.' \
    -F 'companyAddress=250, S-BLock, 27 Street, Adayar, Chennai: 600027' \
    -F 'employeeName=Paalamugan S' \
    -F 'employeeEmail=abc@gmail.com' \
    -F 'employeeId=emp01' \
    -F 'employeePosition=Software Engineer' \
    -F 'employeeJoiningDate=2020-04-08' \
    -F 'employeeUan=201017181120' \
    -F 'employeeAccountNumber=8718927610892' \
    -F 'employeePfAccountNumber=TN/AAA/0000000/000/0000000' \
    -F 'employeePaidDays=28' \
    -F 'employeeLopDays=3' \
    -F 'earnings=[{"name":"Basic pay","amount":25000},{"name":"House Rent Allowance","amount":5000},{"name":"Dearness Allowance","amount":3750}]' \
    -F 'deductions=[{"name":"Provident Fund","amount":3000},{"name":"Income Tax","amount":1250}]' \
    -F 'reimbursements=[{"name":"Medical Reimbursement","amount":5000},{"name":"Telephone Reimbursement","amount":1750},{"name":"Conveyance Reimbursement","amount":500}]' \
    -F 'type=email' \
    http://localhost:3000/api/payslip | jq
```

### Learning

- Earnings List

```
Basic pay
House Rent Allowance
Dearness Allowance
Overtime
Performance Bonus
Medical Allowance
Conveyance Allowance
Leave travel Allowance
Special Allowance
Lunch Allowance
Telephone Allowance
```

- Deductions List

```
Provident Fund -  12% Basic salary
Professinal Tax - Its a state tax applicable in only certain states
Income Tax - Tentative tax every month based on your tax saving declaration
```

- Income Tax Calculation

```
Up to ₹ 2.5 lakh   -   Nil
5% on ₹ 2.5 lakh (₹ 5 lakh – ₹ 2.5 lakh)  -  ₹ 12,500
10% on ₹ 4.85 lakhs (₹ 9.85 lakh – ₹ 5 lakh)  -  ₹ 61,000
20% on ₹ 5 lakhs (₹ 10 lakh – ₹ 5 lakh)  -  ₹ 1,00,000
30% on Above ₹ 10,00,000  -  ₹ 2,62,500 assuming net income of ₹ 15 lakh
```

### Income Tax Example

Calculating the income tax is actually very easy. The formula is:

Basic salary
+ HRA
+ Special Allowance
+ Transport Allowance
+ any other allowance
--------------------------------------
Gross income from salary
(-) Deductions
--------------------------------------
Net income
(Tax calculated according to the income tax slab)


**Example**

If you has a salary of Rs. 25,000 per month with DA of Rs. 4500 per month, entertainment allowance of Rs. 2250 per month and pays Rs. 3500 towards professional tax, then his taxable income would be calculated as follows:

| Name              |             | Amount     |
|-------------------|:-----------:|-----------:|
| Basic Salary      | 25000 * 12  | = 3,00,000 |
| DA                | 4500 * 12   | = 54,000   |
| EA                | 2250 * 12   | = 27,000   |
| Gross Salary      |             | = 3,81,000 |
| Professional Tax  |             | 3500       |
| Net income        |             | = 3,77,500 |

As his taxable income is Rs. 3,77,500, he falls in the slab of 2.5 lakhs – 5 lakhs of income tax. Thus he has to pay 10% of his net income as income tax.
Income tax on above net income = 10% of 3,77,500
= 37,750

### Reference Convert html to pdf

- [jsreport](https://jsreport.net/learn/base)

- [phantom-html-to-pdf](https://www.npmjs.com/package/phantom-html-to-pdf)

- [html-pdf](https://www.npmjs.com/package/html-pdf)

- [node-html-pdf](https://github.com/marcbachmann/node-html-pdf)

- [puppeteer](https://www.npmjs.com/package/puppeteer)(Use Version `"puppeteer": "^2.0.0"`)
