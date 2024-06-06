"use client"

import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormLabel, RadioGroup, Box, Grid, Link, Radio, Select, MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useState } from 'react';
import "@/style/style.css";
import url from '@/config/url';
import { useRouter } from 'next/navigation';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const schema = yup.object().shape({
  first_name: yup.string().required('First name is required!!'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().required('Email is required').email('Email must be a valid email address'),
  password: yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  gender: yup.string().required('Gender must be specified'),
  age: yup.number().required('Age is required').min(2),
  phone: yup.object().shape({
    phone_number: yup.string().required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    country_code: yup.string().required('Country code is required')
  }),
  address: yup.object().shape({
    city: yup.string().required('City is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    pin_code: yup.string().required('Pin code is required').matches(/^\d{6}$/, 'Pin code must be 6 digits')
  }),
});
useForm
const defaultTheme = createTheme();

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });useForm

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post(`${url.serverUrl}/user/register`, data);
      router.push('/login');
    } catch (error) {useForm
      if (axios.isAxiosError(error) && error.response) {
        console.log('Error response:', error.response); 
        setErrorMessage(error.response.data.message || "There was an error registering the user.");
      } else {
        setErrorMessage("There was an error registering the user.");
      }
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            margin: 8 ,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {errorMessage && (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMessage}
            </Typography>
          )}
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="first_name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="first_name"
                      label="First Name"
                      autoComplete="given-name"
                      autoFocus
                      error={Boolean(errors.first_name)}
                      helperText={errors.first_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="last_name"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      autoComplete="family-name"
                      error={Boolean(errors.last_name)}
                      helperText={errors.last_name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="password"
                      label="Password"
                      type="password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="age"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="age"
                      label="Age"
                      type="number"
                      error={Boolean(errors.age)}
                      helperText={errors.age?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Box>
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup
                        row
                        {...field}
                        defaultValue="female"
                      >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                      </RadioGroup>
                      {errors.gender && (
                        <Typography color="error" variant="body2">
                          {errors.gender.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} display="flex">
                <Grid item xs={3}>
                  <Controller
                    control={control}
                    name="phone.country_code"
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue='+91'
                        fullWidth
                        error={Boolean(errors.phone?.country_code)}
                        displayEmpty
                      >
                        <MenuItem value="+91">+91</MenuItem>
                        <MenuItem value="+33">+33</MenuItem>
                        <MenuItem value="+92">+92</MenuItem>
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Controller
                    control={control}
                    name="phone.phone_number"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="phone_number"
                        label="Phone Number"
                        type="number"
                        error={Boolean(errors.phone?.phone_number)}
                        helperText={errors.phone?.phone_number?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="address.city"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="city"
                      label="City"
                      error={Boolean(errors.address?.city)}
                      helperText={errors.address?.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="address.state"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="state"
                      label="State"
                      error={Boolean(errors.address?.state)}
                      helperText={errors.address?.state?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="address.pin_code"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="pin_code"
                      label="Pin Code"
                      type="number"
                      error={Boolean(errors.address?.pin_code)}
                      helperText={errors.address?.pin_code?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="address.country"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      id="country"
                      label="Country"
                      error={Boolean(errors.address?.country)}
                      helperText={errors.address?.country?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
