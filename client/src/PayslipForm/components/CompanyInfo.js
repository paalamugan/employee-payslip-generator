import React from 'react';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { Grid, Typography, TextField, Button, Tooltip } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Alert from './Alert';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
export default forwardRef(function CompanyInfo({ templateData, classes }, ref) {

  const [company, setCompany] = useState({ ...templateData.current.company });
  const [isEnableCompanyIconUrl, setIsEnableCompanyIconUrl] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  useImperativeHandle(ref, () => ({

    set(company) {
      setCompany(company);
    },

    reset(company) {
      setCompany(company);
    }

  }));

  const handleChange = (property) => {
    return (event) => {

      let value = (property === 'icon' ? event.target.files[0] : event.target.value);

      if (value && value.type && !value.type.includes('image')) {
        return setOpenAlert(true);
      }

      templateData.current.company[property] = value;
      setCompany({ ...company, [property]: value });

    }
  }

  const onChangeIcon = (e) => {

    let checked = e.target.checked;

    if (checked) {
      templateData.current.company.iconUrl = '';
    } else {
      templateData.current.company.icon = null;
    }

    setCompany({ ...templateData.current.company });

    setIsEnableCompanyIconUrl(checked);

  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Company Information
      </Typography>

      <Alert open={openAlert} onClose={setOpenAlert} type="error" children="Support only image format.(svg, png, jpg)" />

      <Grid container spacing={3} className={classes.girdButton}>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Switch
                checked={isEnableCompanyIconUrl}
                onChange={onChangeIcon}
                color="primary"
              />
            }
            label="Enable Icon URL"
          />
          {
            (isEnableCompanyIconUrl ? (
              <Grid item xs={12}>
                <TextField
                  required
                  id="companyIconUrl"
                  name="companyIconUrl"
                  label="Company Icon URL"
                  autoComplete="off"
                  value={company.iconUrl}
                  onChange={handleChange('iconUrl')}
                  fullWidth
                />
              </Grid>) :
            (<div className={classes.root}>
              <input
                accept="image/*"
                className={classes.input}
                id="companyIcon"
                name="companyIcon"
                type="file"
                onChange={handleChange('icon')}
              />
              <div className={classes.uploadText}>
                {company.icon && company.icon.name ? company.icon.name : 'No files chosen'}
              </div>
              <label htmlFor="companyIcon" className={classes.uploadButton}>
                <Tooltip title="Choose your company icon" arrow placement="top">
                  <Button
                    variant="contained"
                    component="span"
                    size="small"
                    startIcon={<CloudUploadIcon />}>
                    Upload Icon
                  </Button>
                </Tooltip>
              </label>
            </div>))
          }

        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            required
            id="companyName"
            name="companyName"
            label="Company name"
            autoComplete="off"
            value={company.name}
            onChange={handleChange('name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="companyAddress"
            name="companyAddress"
            label="Company Address"
            value={company.address}
            onChange={handleChange('address')}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
})