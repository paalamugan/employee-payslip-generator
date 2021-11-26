import React, { Fragment, useRef, useState } from 'react';
import { isObject, isArray, cloneDeep } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import SendIcon from '@material-ui/icons/Send';

import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import { API_ENDPOINT, PayslipSampleData } from '../common';

import { CompanyInfo, EmployeeInfo, EarningAndDeduction, Success, Alert } from './components';

const REST_FETCH_API = `${API_ENDPOINT}/payslip`;

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    opacity: 0.9,
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  section: {
    marginTop: theme.spacing(4),
  },
  root: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    display: 'none'
  },
  uploadButton: {
    cursor: 'pointer',
    minWidth: '135px'
  },
  uploadText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  girdButton: {
    marginBottom: theme.spacing(3),
  },
  addButton: {
    marginLeft: theme.spacing(1)
  },
  marginBottom2: {
    marginBottom: theme.spacing(2)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  floatRight: {
    float: 'right'
  },
  marginTop3: {
    marginTop: theme.spacing(3)
  }
}));

const initialData = {
  company: {
    icon: null,
    iconUrl: '',
    name: '',
    address: ''
  },
  employee: {
    name: '',
    email: '',
    id: '',
    position: '',
    joiningDate: null,
    uan: '',
    accountNumber: '',
    pfAccountNumber: '',
    paidDays: 0,
    lopDays: 0
  },
  earnings: [],
  deductions: [],
  reimbursements: []
}

export default function PayslipForm() {

  const classes = useStyles();

  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState({ open:false, type: '', children: '' });
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const templateData = useRef(cloneDeep(initialData));
  const companyRef =  useRef();
  const employeeRef =  useRef();
  const earningRef =  useRef();
  const deductionRef =  useRef();
  const reimbursementRef =  useRef();

  const handleReset = () => {
    templateData.current = cloneDeep(initialData);

    companyRef.current.reset(templateData.current.company);
    employeeRef.current.reset(templateData.current.employee);
    earningRef.current.reset(templateData.current.earnings);
    deductionRef.current.reset(templateData.current.deductions);
    reimbursementRef.current.reset(templateData.current.reimbursements);
  }

  const onSetSampleData = () => {
    templateData.current = cloneDeep(PayslipSampleData);

    companyRef.current.set(templateData.current.company);
    employeeRef.current.set(templateData.current.employee);
    earningRef.current.set(templateData.current.earnings);
    deductionRef.current.set(templateData.current.deductions);
    reimbursementRef.current.set(templateData.current.reimbursements);

  }

  const handleFetchRequest = (type) => {

    return (event) => {

        event.preventDefault();

        templateData.current.type = type;

        if (type === 'download') {
          setIsDownloadLoading(true);
        } else {
          setIsEmailLoading(true);
        }

        var form = new FormData();

        for (const key in templateData.current) {
            if (isObject(templateData.current[key]) && !isArray(templateData.current[key])) {
                for (const subKey in templateData.current[key]) {
                  if (templateData.current[key][subKey]) {
                    form.append(key + subKey.charAt(0).toUpperCase() + subKey.slice(1), templateData.current[key][subKey]);
                  }
                }
            } else if (isArray(templateData.current[key])) {
                form.append(key, JSON.stringify(templateData.current[key]));
            } else {
              if (templateData.current[key]) {
                form.append(key, templateData.current[key]);
              }
            }
        }

        let fileName = 'payslip.pdf';
        fetch(REST_FETCH_API, {
            method: 'POST',
            body: form
        })
        .then((response) => {

          if (!response.ok) {
            return response.json();
          }

          let contentDisposition = response.headers.get('content-disposition');

          if (contentDisposition) {
            fileName = contentDisposition.replace(/.*="|"$/g, '');
          }

          return (type === 'download' ? response.blob() : response.json())
        })
        .then((response) => {

          if (response.status && response.status > 399) {
            throw new Error(response.message);
          }

          return response;
        })
        .then((result) => {

            if (type === 'download') {

              const link = document.createElement('a')
              link.href = URL.createObjectURL(result)
              link.download = fileName;
              link.click();

              URL.revokeObjectURL(link.href);

              handleReset();
              setIsDownloadLoading(false);
              setAlert({ open: true, type: 'success', children: 'Successfully Downloaded.' });

            } else {

              handleReset();
              setIsEmailLoading(false);
              setResult(result);

            }

        })
        .catch((err) => {

          setAlert({ open: true, type: 'error', children: err.message });

          if (type === 'download') {
            setIsDownloadLoading(false);
          } else {
            setIsEmailLoading(false);
          }

        })
    }
  };

  return (
    <Fragment>
      <Alert {...alert} duration={5000} onClose={() => setAlert({...alert, open: false })} />
      <main className={classes.layout}>
        <Paper elevation={0} className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Employee Payslip Generator
          </Typography>
          {
            result ? (<Success result={result} setResult={setResult} classes={classes} />) :
              (<Fragment>
                <section className={classes.section}>
                  <Button variant="contained" size="small" className={classes.floatRight} onClick={onSetSampleData}>Set Sample Data</Button>
                  <CompanyInfo templateData={templateData} classes={classes} ref={companyRef} />
                  <EmployeeInfo templateData={templateData} classes={classes} ref={employeeRef} />
                  <EarningAndDeduction type="earning" templateData={templateData} classes={classes} ref={earningRef} />
                  <EarningAndDeduction type="deduction" templateData={templateData} classes={classes} ref={deductionRef} />
                  <EarningAndDeduction type="reimbursement" templateData={templateData} classes={classes} ref={reimbursementRef} />
                </section>

                <div className={classes.buttons}>
                  <Button
                    variant="contained"
                    onClick={handleReset}
                    className={classes.button} >
                      Reset
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={isDownloadLoading ? <CircularProgress size={24} thickness={4} value={100} /> : <GetAppIcon />}
                    onClick={handleFetchRequest('download')}
                    disabled={isDownloadLoading}
                    className={classes.button} >
                      Download as PDF
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={isEmailLoading ? <CircularProgress size={24} thickness={4} value={100} /> : <SendIcon />}
                    onClick={handleFetchRequest('email')}
                    disabled={isEmailLoading}
                    className={classes.button}
                  >
                    Send as Email
                  </Button>
                </div>
              </Fragment>)
          }

        </Paper>
      </main>
    </Fragment>
  );
}