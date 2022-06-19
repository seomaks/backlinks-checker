import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {ErrorType, setAppErrorAC} from "../../state/app-reducer";
import {AppRootStateType} from "../../state/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
  const dispatch = useDispatch()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAppErrorAC(null))
  };

  const error = useSelector<AppRootStateType, ErrorType>(state => state.app.error)

  return (
    <Snackbar open={ error !== null } autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
        {error}
      </Alert>
    </Snackbar>
  );
}
