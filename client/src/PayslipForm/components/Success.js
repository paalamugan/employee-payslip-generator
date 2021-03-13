import { Fragment } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Alert, AlertTitle } from '@material-ui/lab';

// const useStyles = makeStyles((theme) => ({
//   marginBottom2: {
//     marginBottom: theme.spacing(2),
//   },
//   marginTop3: {
//     marginTop: theme.spacing(3),
//   },
// }));

export default function Success({ result, setResult = () => {}, classes }) {
  // const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.marginTop3}>
        <Grid container justify="flex-end" className={classes.marginBottom2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            size="small"
            onClick={() => setResult(null)}
          >
            Back
          </Button>
        </Grid>
        <Alert severity="success" className={classes.marginBottom2}>
          <AlertTitle>Success</AlertTitle>
          {result.to ? (<span>Successfully Email Sent to - <strong>result.to</strong></span>) : null}
          {result.type === 'ethereal' ? <div> <span>Successfully Email Generator</span>.<Button size="small" href={result.url} color="primary" target="_blank">Click here to View Mail</Button> </div> : null }
        </Alert>
      </div>
    </Fragment>
  );
}