import React from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {LoginParamsType, loginTC} from "../../state/auth-reducer";
import {ErrorSnackbar} from "../error-snackbar/error-snackbar";
import {useAppDispatch} from "../../hooks/hooks";

export const Login = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: (values) => {
      const errors: Partial<LoginParamsType> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      } else if (!values.password.length) {
        errors.password = 'Enter password'
      } else if (values.password.length <= 2) {
        errors.password = 'Incorrect password'
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email &&
              formik.errors.email &&
              <div style={{color: "red"}}>{formik.errors.email}</div>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password &&
              formik.errors.password &&
              <div style={{color: "red"}}>{formik.errors.password}</div>}
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
    <ErrorSnackbar />
  </Grid>
}
