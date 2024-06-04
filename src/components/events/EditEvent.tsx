"use client"
import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Grid, Box } from "@mui/material";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"
import { fetchEditEvent } from "@/redux/slices/eventSlice";
import { Event } from '@/types/eventTypes';
import '@/style/style.css'
import type { FormData } from "@/types/formDataTypes";

const schema = yup.object().shape({
  title: yup.string().required('Event title is required!!'),
  time: yup.object().shape({
    start_date: yup.string().required('Start date is required'),
    end_date: yup.string(),
    moment: yup.string().required("Time must be provided")
  }),
  location: yup.object().shape({
    latitude: yup.number(),
    longitude: yup.number()
  }),
  description: yup.string().required('Description is required!!'),
  totalTickets: yup.number().required('Total number of tickets must be provided'),
  duration: yup.string().required('Duration is required!!'),
  image: yup.string().required('Image is required!!'),
  venue: yup.string().required('Venue is required!!'),
  price: yup.number().required('Price is required!!'),
})

interface Props {
  params: Event
}

const EditEvent = ({params}: Props) => {
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');

  const router = useRouter()
  const dispatch = useDispatch<any>()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
        resolver: yupResolver(schema)
      });
  
  const onFormSubmit: SubmitHandler<FormData> = async (data) => {
    
    const formDataToSend = new FormData();
    formDataToSend.append("event_id", params._id);
    formDataToSend.append("title", data.title);
    formDataToSend.append("start_date", data.time.start_date!.toString());
    formDataToSend.append("end_date", data.time.end_date!.toString());
    formDataToSend.append("moment", data.time.moment.toString());
    formDataToSend.append("description", data.description);
    formDataToSend.append("totalTickets", data.totalTickets.toString());
    formDataToSend.append("venue", data.venue);
    formDataToSend.append("duration", data.duration);
    formDataToSend.append("price", data.price.toString());
    formDataToSend.append("image", image);

    dispatch(fetchEditEvent(formDataToSend))
      router.push("/dashboard")
    };

  const handleImageChange = (e:any) => {
    const selectedFile = URL.createObjectURL(e.target.files[0]);
    setPreview(selectedFile);
    const selectedFiles = e.target.files[0];
    setImage(selectedFiles);
  };
  const initialValue = (data: Event) => {
    reset({
      title: data.title,
      time: {
        start_date: data.time.start_date ? data.time.start_date.toString() : '',
        end_date: data.time.end_date ? data.time.end_date.toString() : '',        
        moment: data.time.moment,
      },
      description: data.description,
      totalTickets: data.totalTickets,
      duration: data.duration,
      image: data.image,
      price: data.price,
      venue: data.venue
      })
  }

useEffect(() => {
 initialValue(params)
},[params])

  return (

    <Box className="container">
      <Grid container spacing={2} style={{justifyContent:'center', marginBottom:'20px'}}>
        
        <Grid item xs={12}>
          <Typography variant="h4" style={{ textAlign: "center", margin: "30px 0 10px 0" }}>
            Edit Event
          </Typography>
        </Grid>

          {preview ? 
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
              <img src={preview} alt="Preview" style={{width:"20%"}}/>
            </Grid> 
            :
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
              <img src={params.image} alt="preview image" style={{width:"10%"}}/>
            </Grid>
          }

          <Grid item xs={12} style={{ marginBottom: "20px" }}> {/* image */} 
            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field: { ref, ...field } }) => (
                <Grid>
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
                </Grid>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>  {/* title */}
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

          <Grid item xs={12} sm={6} >  {/* start_date */}
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

          <Grid item xs={12} sm={6}>  {/* venue */}
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

          <Grid item xs={12}>  {/* description */}
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

          <Grid>
            <Button 
              variant="contained" 
              color="primary"
              fullWidth 
              type="submit" 
              sx={{ marginTop: '25px' }}
              onClick={handleSubmit( onFormSubmit )}
            >
              Submit
            </Button>
          </Grid>
      
      </Grid>
    </Box>
  );
};

export default EditEvent;

