# Employee Monthly Payslip Generator API

Generate a Employee monthly payslip and send to mail

To Run Server: npm run start

Method: Post

Url: <http://localhost:3000/employee>

Request Body:
```
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
