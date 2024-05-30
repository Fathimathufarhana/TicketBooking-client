'use client';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import url from '@/config/url';
import { useAuth } from '@/hooks/useAuth';


const defaultTheme = createTheme();

interface FormValues  {
  email : string
  password : string
}

const LoginForm = () => {
// const SignIn() {
const router = useRouter()
const { login } = useAuth()

const {
  register,
  handleSubmit,
  setError,
  control,
  formState: { errors },
} = useForm<FormValues>()
const onSubmit = handleSubmit((data) =>{
        const {email,password} = data
        console.log(data,'submit login')
        login({ email, password}, () => {
            setError('email',{
                type : 'manual',
                message : 'Invalid email or password!'
            })
        })
})

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" >
            Sign in
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <TextField  {...register('email')}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.email)}
                {...(errors.email && {helperText:errors.email.message})}
              />
            )}
          />
            <Controller
              control={control}
              name="password"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <TextField {...register('password')}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={Boolean(errors.password)}
                  {...(errors.password && {helperText:errors.password.message})}
                />
              )}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default LoginForm
