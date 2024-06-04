"use client"

import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormLabel, RadioGroup, Box, Grid, Radio, Select, MenuItem } from '@mui/material'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { useEffect, useState } from 'react';
import "@/style/style.css"
import url from '@/config/url';
import { User, defaultUserData } from '@/types/userTypes';


const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

const schema = yup.object().shape({
  first_name: yup.string(),
  last_name: yup.string(),
  email: yup.string(),
  password: yup.string() 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter and one number'),
  gender: yup.string(),
  age: yup.number().min(2).max(120),
  phone: yup.object().shape({
    phone_number: yup.number(),
    country_code: yup.string()
  }),
  address: yup.object().shape({
    city: yup.string()!,
    country: yup.string()!,
    state: yup.string()!,
    pin_code: yup.number()!,
  }),
})

const defaultTheme = createTheme();

const Settings = () => {
  const [user,setUser] = useState<User>(defaultUserData)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const storedToken = localStorage.getItem("access_token")!
  const headers = { Authorization: `Bearer ${storedToken}` };

  const onSubmit = handleSubmit((data) => {
    console.log(data,"settings")
    const response = axios.post(`${url.serverUrl}/user/settings`,{user_id: user._id, ...data},
    {headers})
  })

  useEffect(() => {
    const user = localStorage.getItem("user_id")

    const fetchUser = async () => {
      const response = await axios.post(`${url.serverUrl}/user/view`,{ user_id: user },
        {headers})
        .then((res) => {
          const fetchData = res.data
          setUser(fetchData.data);
        })
    };
      fetchUser()
  },[])

  const initialValue = (data: User) => {
    reset({
      first_name : data.first_name,
      last_name : data.last_name,
      email : data.email,
      password : data.password,
      gender : data.gender,
      age : data.age,
      phone: {
        phone_number: data.phone.phone_number,
        country_code: data.phone.country_code,
      },
      address: {
        city: data.address.city,
        country: data.address.country,
        pin_code: data.address.pin_code,
        state: data.address.state,
      } 
      })
  }

useEffect(() => {
 initialValue(user)
},[user])


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth='md'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '950px'
          }}
        >
          <Typography component="h1" variant="h5">
            Update profile
          </Typography>
          
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>  {/* first name */}
                  <Controller
                    control={control}
                    name="first_name"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('first_name')}
                        autoComplete="given-name"
                        name="first_name"
                        fullWidth
                        id="first_name"
                        InputLabelProps={{ shrink: true }}
                        label="First Name"
                        autoFocus
                        error={Boolean(errors.first_name)}
                        {...(errors.first_name && {helperText:errors.first_name.message})}
                      />
                    )}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>  {/* last name */}
                  <Controller
                    control={control}
                    name="last_name"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('last_name')}
                        fullWidth
                        id="last_name"
                        label="Last Name"
                        InputLabelProps={{ shrink: true }}
                        name="last_name"
                        autoComplete="family-name"
                        error={Boolean(errors.last_name)}
                        {...(errors.last_name && {helperText:errors.last_name.message})}
                      />
                    )}
                  />
                </Grid>
  
                <Grid item xs={12} sm={6}>  {/* email */}
                  <Controller
                    control={control}
                    name="email"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <>
                      <TextField {...register('email')}
                        fullWidth
                        id="email"
                        label="Email Address"
                        InputLabelProps={{ shrink: true }}
                        name="email"
                        type='email'
                        autoComplete="email"
                        error={Boolean(errors.email)}
                        {...(errors.email && {helperText:errors.email.message})}
                      />
                      </>
                    )}
                  />
                </Grid>
                 
                <Grid item xs={12} sm={6}>  {/* age */}
                  <Controller
                    control={control}
                    name="age"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('age')}
                        fullWidth
                        name="age"
                        label="Age"
                        InputLabelProps={{ shrink: true }}
                        type="number"
                        id="age"
                        error={Boolean(errors.age)}
                        {...(errors.age && {helperText:errors.age.message})}
                      />
                    )}
                  />
                </Grid> 
                
                <Grid item xs={12} sm={6}>  {/* gender */}
                <Controller
                    control={control}
                    name="gender"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <Box>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue='male'
                        >
                          <FormControlLabel {...register("gender")} 
                            value="female" 
                            control={<Radio />} 
                            label="Female" 
                          />
                          <FormControlLabel {...register("gender")} 
                            value="male" 
                            control={<Radio />} 
                            label="Male" 
                          />
                        </RadioGroup>
                      </Box>
                    )}
                    />
                </Grid>

                <Grid item xs={12} sm={6} display="flex">   {/* phone */}
                  <Grid item xs={3}>
                    <Controller
                      control={control}
                      name="phone.country_code"
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                        <Select
                          {...register('phone.country_code')}
                          labelId="demo-simple-select-label"
                          id="designation"
                          label="Designation"
                          defaultValue={91}
                          error={Boolean(errors.phone?.country_code)}
                          {...(errors.phone?.country_code && {helperText:errors.phone?.country_code.message})}
                        >
                          <MenuItem value={91}>+91</MenuItem>
                          <MenuItem value={33}>+33</MenuItem>
                          <MenuItem value={92}>+92</MenuItem>
                        </Select>
                      )}
                    />
                  </Grid>

                  <Grid item xs={9}>
                    <Controller
                      control={control}
                      name="phone.phone_number"
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                        <TextField {...register('phone.phone_number')}
                          fullWidth
                          label="phone_number"
                          InputLabelProps={{ shrink: true }}
                          type="number"
                          id="phone_number"
                          error={Boolean(errors.phone?.phone_number)}
                          {...(errors.phone?.phone_number && {helperText:errors.phone.phone_number.message})}
                        />
                      )}
                    />
                  </Grid>
                </Grid>


                <Grid item xs={12} sm={6}>  {/* city */}
                  <Controller
                    control={control}
                    name="address.city"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('address.city')}
                        fullWidth
                        label="City"
                        InputLabelProps={{ shrink: true }}
                        type="string"
                        id="city"
                        error={Boolean(errors.address?.city)}
                        {...(errors.address?.city && {helperText:errors.address?.city.message})}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>  {/* state */}
                  <Controller
                    control={control}
                    name="address.state"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('address.state')}
                        fullWidth
                        label="State"
                        InputLabelProps={{ shrink: true }}
                        type="string"
                        id="state"
                        error={Boolean(errors.address?.state)}
                        {...(errors.address?.state && {helperText:errors.address?.state.message})}
                      />
                    )}
                  />
                </Grid>
               
                <Grid item xs={12} sm={6}> {/* pin */}
                  <Controller
                    control={control}
                    name="address.pin_code"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('address.pin_code')}
                        fullWidth
                        label="Pin code"
                        InputLabelProps={{ shrink: true }}
                        type="number"
                        id="pin"
                        error={Boolean(errors.address?.pin_code)}
                        {...(errors.address?.pin_code && {helperText:errors.address?.pin_code.message})}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>  {/* country */}
                  <Controller
                    control={control}
                    name="address.country"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('address.country')}
                        fullWidth
                        label="Country"
                        InputLabelProps={{ shrink: true }}
                        type="string"
                        id="country"
                        error={Boolean(errors.address?.country)}
                        {...(errors.address?.country && {helperText:errors.address?.country.message})}
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
              Submit
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Settings
