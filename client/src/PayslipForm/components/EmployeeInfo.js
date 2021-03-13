import { useState, Fragment, forwardRef, useImperativeHandle } from 'react';
import { Grid, Typography, TextField } from '@material-ui/core';

import DateMomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default forwardRef(function EmployeeInfo({ templateData, classes }, ref) {

  const [employee, setEmployee] = useState({ ...templateData.current.employee });

  const handleChange = (property) => {
    return (event) => {
      let value = (property === 'joiningDate' ? event && event.format() : event.target.value);
      templateData.current.employee[property] = value;
      setEmployee({ ...employee, [property]: value });
    }
  }

  useImperativeHandle(ref, () => ({

    set(employee) {
      setEmployee(employee);
    },

    reset(employee) {
      setEmployee(employee);
    }

  }));

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Employee Information
      </Typography>
      <Grid container spacing={3} className={classes.girdButton}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="employeeName"
            name="employeeName"
            label="Employee Name"
            value={employee.name}
            onChange={handleChange('name') }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="employeeEmail"
            name="employeeEmail"
            label="Employee Email"
            type="email"
            value={employee.email}
            onChange={handleChange('email') }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="position"
            name="position"
            label="Employee Position"
            value={employee.position}
            onChange={handleChange('position') }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="employeeId"
            name="employeeId"
            label="Employee Id"
            value={employee.id}
            onChange={handleChange('id') }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateMomentUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="YYYY-MM-DD"
              id="joiningDate"
              name="joiningDate"
              label="Joining Date (YYYY-MM-DD)"
              value={employee.joiningDate}
              onChange={handleChange('joiningDate') }
              KeyboardButtonProps={{
                'aria-label': 'joining date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="accountNumber"
            name="accountNumber"
            label="Account Number"
            value={employee.accountNumber}
            onChange={handleChange('accountNumber') }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="pfAccountNumber"
            name="pfAccountNumber"
            label="PF Account Number"
            value={employee.pfAccountNumber}
            onChange={handleChange('pfAccountNumber') }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="uan"
            name="uan"
            label="Universal Account Number (UAN)"
            value={employee.uan}
            onChange={handleChange('uan') }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="paidDays"
            name="paidDays"
            label="Paid Days"
            value={employee.paidDays}
            onChange={handleChange('paidDays') }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number"
            id="lopDays"
            name="lopDays"
            label="LOP Days"
            value={employee.lopDays}
            onChange={handleChange('lopDays') }
            fullWidth
          />
        </Grid>
      </Grid>
    </Fragment>
  );
})