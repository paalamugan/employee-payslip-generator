import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function Alert({ open, duration = 5000, onClose = () => {}, anchorOrigin = { vertical: 'top', horizontal: 'center' }, type, ...rest }) {

  if (!type || !rest.children) {
    return null;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin = {anchorOrigin}
      autoHideDuration={duration}
      onClose={handleClose}>
        <MuiAlert onClose={handleClose} elevation={6} variant="filled" severity={type} {...rest} />
    </Snackbar>);
}