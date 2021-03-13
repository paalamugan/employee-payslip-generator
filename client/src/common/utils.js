import moment from 'moment';

export const API_ENDPOINT = '/api';

const BasicSalary = 25000;

const calculateAmount = (percentage = 0) => {
  return (BasicSalary * percentage) / 100
}

export const PayslipSampleData = {
  company: {
    icon: null,
    iconUrl: '',
    name: 'Tarzax Technology Pvt ltd.',
    address: '250, S-BLock, 27 Street, Adayar, Chennai: 600027'
  },
  employee: {
    name: 'Paalamugan S',
    email: 'abc@gmail.com',
    id: 'emp01',
    position: 'Software Engineer',
    joiningDate: moment('2020-04-08').format(),
    uan: '201017181120',
    accountNumber: '8718927610892',
    pfAccountNumber: 'TN/AAA/0000000/000/0000000',
    paidDays: 28,
    lopDays: 3
  },
  earnings: [
    {
      name: 'Basic pay',
      amount: BasicSalary
    },
    {
      name: 'House Rent Allowance',
      amount: calculateAmount(20)
    },
    {
      name: 'Dearness Allowance',
      amount: calculateAmount(15)
    },
    // {
    //   name: 'Overtime',
    //   amount: calculateAmount(13)
    // },
    // {
    //   name: 'Performance Bonus',
    //   amount: calculateAmount(5)
    // },
  ],
  deductions: [
    {
      name: 'Provident Fund', // 12% Basic salary
      amount: calculateAmount(12)
    },
    {
      name: 'Income Tax', // Tentative tax every month based on your tax saving declaration
      amount: calculateAmount(5)
    },
    // {
    //   name: 'Professional Tax', // Its a state tax applicable in only certain states
    //   amount: 350
    // }
  ],
  reimbursements: [
    {
      name: 'Medical Reimbursement',
      amount: calculateAmount(20),
    },
    {
      name: 'Telephone Reimbursement',
      amount: calculateAmount(7),
    },
    // {
    //   name: 'Leave travel Reimbursement',
    //   amount: calculateAmount(6),
    // },
    {
      name: 'Conveyance Reimbursement',
      amount: calculateAmount(2),
    },
    // {
    //   name: 'Special Reimbursement',
    //   amount: calculateAmount(1),
    // },
    // {
    //   name: 'Lunch Reimbursement',
    //   amount: calculateAmount(1),
    // },
  ]
}