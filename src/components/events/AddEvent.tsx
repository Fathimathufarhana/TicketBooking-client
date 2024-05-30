"use client"
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"
import { fetchAddEvent } from "@/redux/slices/eventSlice";
import { Event } from '@/types/eventTypes';

const schema = yup.object().shape({
  title: yup.string().required('Event title is required!!'),
  time: yup.object().shape({
    start_date: yup.string().required('Start date is required'),
    end_date: yup.string(),
    moment: yup.string().required("Time must be provided")
  }),
  // location: yup.object().shape({
  //   latitude: yup.number(),
  //   longitude: yup.number()
  // }),
  description: yup.string().required('Description is required!!'),
  totalTickets: yup.number().required('Total number of tickets must be provided'),
  duration: yup.string().required('Duration is required!!'),
  image: yup.string().required('Image is required!!'),
  venue: yup.string().required('Venue is required!!'),
  price: yup.number().required('Price is required!!'),
})


const CreateEvent = () => {
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');


  const router = useRouter()
  const dispatch = useDispatch<any>()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onFormSubmit = async (data:Event) => {
    console.log(data,"daat in add");
    
    const formDataToSend = new FormData();
    formDataToSend.append("title", data.title);
    formDataToSend.append("start_date", data.time.start_date!.toString());
    formDataToSend.append("end_date", data.time.end_date!.toString());
    formDataToSend.append("moment", data.time.moment.toString());
    // formDataToSend.append("latitude", data.location.latitude.toString());
    // formDataToSend.append("longitude", data.location.longitude.toString());
    formDataToSend.append("description", data.description);
    formDataToSend.append("totalTickets", data.totalTickets.toString());
    formDataToSend.append("venue", data.venue);
    formDataToSend.append("duration", data.duration);
    formDataToSend.append("price", data.price.toString());
    // formDataToSend.append("image", data.image[0]);
    formDataToSend.append("image", image);

    dispatch(fetchAddEvent(formDataToSend))
      router.push("/dashboard")
    };

  const handleImageChange = (e:any) => {
    const selectedFile = URL.createObjectURL(e.target.files[0]);
    setPreview(selectedFile);
    const selectedFiles = e.target.files[0];
    setImage(selectedFiles);
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          style={{
            margin: "20px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "400px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <form onSubmit={handleSubmit( onFormSubmit )}>
            <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px" }}>
              Create Event
            </Typography>
        
            {preview && (
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                <img src={preview} alt="Preview" style={{width:"30%"}}/>
              </Grid>
            )}
            <Box style={{ marginBottom: "20px" }}> {/* image */} 
                <Controller
                  control={control}
                  name="image"
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <Box>
                      <input
                        {...register("image")}
                        name="image"
                        accept="image/png,image/jpg,image/jpeg"
                        style={{ display: "none" }}
                        id="image"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="image">
                        <Button
                          variant="contained"
                          component="span"
                          fullWidth
                          sx={{ mt: 2 }}
                        >
                          Upload Cover Image
                        </Button>
                      </label>
                    </Box>
                  )}
                />
              <p>{errors.image?.message}</p>
            </Box>

            <Grid item xs={12}>  {/* title */}
                  <Controller
                    control={control}
                    name="title"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('title')}
                        autoComplete="given-name"
                        name="title"
                        fullWidth
                        id="title"
                        InputLabelProps={{ shrink: true }}
                        label="Title"
                        autoFocus
                        error={Boolean(errors.title)}
                        {...(errors.title && {helperText:errors.title.message})}
                      />
                    )}
                  />
            </Grid>

            <Grid item xs={12} sm={6}>  {/* start_date */}
                  <Controller
                    control={control}
                    name="time.start_date"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('time.start_date')}
                        autoComplete="given-name"
                        name="time.start_date"
                        type="date"
                        fullWidth
                        id="start_date"
                        InputLabelProps={{ shrink: true }}
                        label="Start date"
                        autoFocus
                        error={Boolean(errors.time?.start_date)}
                        {...(errors.time?.start_date && {helperText:errors.time?.start_date.message})}
                      />
                    )}
                  />
            </Grid>

            <Grid item xs={12} sm={6}>  {/* end_date */}
                  <Controller
                    control={control}
                    name="time.end_date"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('time.end_date')}
                        autoComplete="given-name"
                        name="time.end_date"
                        type="date"
                        fullWidth
                        id="end_date"
                        InputLabelProps={{ shrink: true }}
                        label="End date"
                        autoFocus
                        error={Boolean(errors.time?.end_date)}
                        {...(errors.time?.end_date && {helperText:errors.time?.end_date.message})}
                      />
                    )}
                  />
            </Grid>

            <Grid item xs={12} sm={6}>  {/* moment */}
                  <Controller
                    control={control}
                    name="time.moment"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('time.moment')}
                        autoComplete="given-name"
                        name="time.moment"
                        type="time"
                        fullWidth
                        id="moment"
                        InputLabelProps={{ shrink: true }}
                        label="Time"
                        autoFocus
                        error={Boolean(errors.time?.moment)}
                        {...(errors.time?.moment && {helperText:errors.time?.moment.message})}
                      />
                    )}
                  />
            </Grid>

            <Grid item xs={12}>  {/* venue */}
                  <Controller
                    control={control}
                    name="venue"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('venue')}
                        autoComplete="given-name"
                        name="venue"
                        fullWidth
                        id="venue"
                        InputLabelProps={{ shrink: true }}
                        label="venue"
                        autoFocus
                        error={Boolean(errors.venue)}
                        {...(errors.venue && {helperText:errors.venue.message})}
                      />
                    )}
                  />
            </Grid>

            <Grid item xs={12} sm={6}>  {/* description */}
                  <Controller
                    control={control}
                    name="description"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('description')}
                        name="description"
                        type="text"
                        fullWidth
                        id="description"
                        InputLabelProps={{ shrink: true }}
                        label="description"
                        autoFocus
                        error={Boolean(errors.description)}
                        {...(errors.description && {helperText:errors.description.message})}
                      />
                    )}
                  />
            </Grid>

            <Grid item xs={12} sm={6}>  {/* totalTickets */}
                  <Controller
                    control={control}
                    name="totalTickets"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('totalTickets')}
                        name="totalTickets"
                        type="number"
                        fullWidth
                        id="totalTickets"
                        InputLabelProps={{ shrink: true }}
                        label="Total Tickets"
                        autoFocus
                        error={Boolean(errors.totalTickets)}
                        {...(errors.totalTickets && {helperText:errors.totalTickets.message})}
                      />
                    )}
                  />
            </Grid>
      
            <Grid item xs={12} sm={6}>  {/* duration */}
                  <Controller
                    control={control}
                    name="duration"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('duration')}
                        name="duration"
                        type="text"
                        fullWidth
                        id="duration"
                        InputLabelProps={{ shrink: true }}
                        label="Duration"
                        autoFocus
                        error={Boolean(errors.duration)}
                        {...(errors.duration && {helperText:errors.duration.message})}
                      />
                    )}
                  />
            </Grid>

            <Grid item xs={12} sm={6}>  {/* price */}
                  <Controller
                    control={control}
                    name="price"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <TextField {...register('price')}
                        name="price"
                        type="text"
                        fullWidth
                        id="price"
                        InputLabelProps={{ shrink: true }}
                        label="Price"
                        autoFocus
                        error={Boolean(errors.price)}
                        {...(errors.price && {helperText:errors.price.message})}
                      />
                    )}
                  />
            </Grid>

            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Box>
     
    </>
  );
};

export default CreateEvent;
