// "use client"
// import React, { useState } from "react";
// import { Grid, Button, TextField, Typography } from "@mui/material";
// import * as yup from "yup";
// import { Controller, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { fetchAddEvent } from "@/redux/slices/eventSlice";
// import { Event } from '@/types/eventTypes';
// import 'react-quill/dist/quill.snow.css';
// import ReactQuill from 'react-quill';
// import Image from "next/image";


// interface SubmitData {
//   time: {
//     end_date?: string | undefined;
//     start_date: string;
//     moment: string;
// };
// title: string;
// image: string;
// totalTickets: number;
// duration: string;
// venue: string;
// price: number;
// }

// const schema = yup.object().shape({
//   title: yup.string().required('Event title is required!!'),
//   time: yup.object().shape({
//     start_date: yup.string().required('Start date is required'),
//     end_date: yup.string(),
//     moment: yup.string().required("Time must be provided")
//   }),
//   // description: yup
//   //   .string()
//   //   .test('has-value', 'Description is required!!', (value) => {
//   //     // Custom test to check if the description contains any meaningful content
//   //     return !!value && value.replace(/<\/?[^>]+(>|$)/g, '').trim().length > 0;
//   //   }),
//   totalTickets: yup.number().required('Total number of tickets must be provided'),
//   duration: yup.string().required('Duration is required!!'),
//   image: yup.string().required('Image is required!!'),
//   venue: yup.string().required('Venue is required!!'),
//   price: yup.number().required('Price is required!!'),
// });

// const CreateEvent = () => {
//   const [image, setImage] = useState('');
//   const [preview, setPreview] = useState('');
//   const [description, setDescription] = useState('');

//   const router = useRouter();
//   const dispatch = useDispatch<any>();

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema)
//   });

  
  
//   const onFormSubmit = async (data:SubmitData) => {
//     const formattedDescription = description.replace(/<[^>]+>/g, '');
    
//     const formDataToSend = new FormData();
//     formDataToSend.append("title", data.title);
//     formDataToSend.append("start_date", data.time.start_date!.toString());
//     formDataToSend.append("end_date", data.time.end_date!.toString());
//     formDataToSend.append("moment", data.time.moment.toString());
//     formDataToSend.append("description", formattedDescription);
//     formDataToSend.append("totalTickets", data.totalTickets.toString());
//     formDataToSend.append("venue", data.venue);
//     formDataToSend.append("duration", data.duration);
//     formDataToSend.append("price", data.price.toString());
//     formDataToSend.append("image", image);

//     dispatch(fetchAddEvent(formDataToSend));
//     router.push("/dashboard");
//   };

//   const handleImageChange = (e:any) => {
//     const selectedFile = URL.createObjectURL(e.target.files[0]);
//     setPreview(selectedFile);
//     const selectedFiles = e.target.files[0];
//     setImage(selectedFiles);
//   };

//       return (
//         <div className="container">
//           <Grid container spacing={2} style={{justifyContent:'center', marginBottom:'20px'}}>

//             <Grid item xs={12}>
//               <Typography variant="h4" style={{ textAlign: "center", margin: "30px 0 10px 0" }}>
//                 Create Event
//               </Typography>
//             </Grid>
        
//             {preview && (
//               <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
//                 <Image src={preview} alt="Preview" style={{width:"30%"}}/>
//               </Grid>
//             )}

//             <Grid item xs={12}  style={{ marginBottom: "20px" }}> {/* image */} 
//                 <Controller
//                   control={control}
//                   name="image"
//                   rules={{ required: true }}
//                   render={({ field: { ref, ...field } }) => (
//                     <Grid>
//                       <input
//                         {...register("image")}
//                         name="image"
//                         accept="image/png,image/jpg,image/jpeg"
//                         style={{ display: "none" }}
//                         id="image"
//                         type="file"
//                         onChange={handleImageChange}
//                       />
//                       <label htmlFor="image">
//                         <Button
//                           variant="contained"
//                           component="span"
//                           fullWidth
//                           sx={{ mt: 2 }}
//                         >
//                           Upload Cover Image
//                         </Button>
//                       </label>
//                     </Grid>
//                   )}
//                 />
//               <p>{errors.image?.message}</p>
//             </Grid>

//             <Grid item xs={12} sm={6}>  {/* title */}
//                   <Controller
//                     control={control}
//                     name="title"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                       <TextField {...register('title')}
//                         autoComplete="given-name"
//                         name="title"
//                         fullWidth
//                         id="title"
//                         InputLabelProps={{ shrink: true }}
//                         label="Title"
//                         autoFocus
//                         error={Boolean(errors.title)}
//                         {...(errors.title && {helperText:errors.title.message})}
//                       />
//                     )}
//                   />
//             </Grid>

//             <Grid item xs={12} sm={6}>  {/* start_date */}
//                   <Controller
//                     control={control}
//                     name="time.start_date"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                       <TextField {...register('time.start_date')}
//                         autoComplete="given-name"
//                         name="time.start_date"
//                         type="date"
//                         fullWidth
//                         id="start_date"
//                         InputLabelProps={{ shrink: true }}
//                         label="Start date"
//                         autoFocus
//                         error={Boolean(errors.time?.start_date)}
//                         {...(errors.time?.start_date && {helperText:errors.time?.start_date.message})}
//                       />
//                     )}
//                   />
//             </Grid>

//             <Grid item xs={12} sm={6}>  {/* end_date */}
//                   <Controller
//                     control={control}
//                     name="time.end_date"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                       <TextField {...register('time.end_date')}
//                         autoComplete="given-name"
//                         name="time.end_date"
//                         type="date"
//                         fullWidth
//                         id="end_date"
//                         InputLabelProps={{ shrink: true }}
//                         label="End date"
//                         autoFocus
//                         error={Boolean(errors.time?.end_date)}
//                         {...(errors.time?.end_date && {helperText:errors.time?.end_date.message})}
//                       />
//                     )}
//                   />
//             </Grid>

//             <Grid item xs={12} sm={6}>  {/* moment */}
//                   <Controller
//                     control={control}
//                     name="time.moment"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                     <TextField
//                       {...register('time.moment')}
//                       autoComplete="given-name"
//                       name="time.moment"
//                       type="time"
//                       fullWidth
//                       id="moment"
//                       InputLabelProps={{ shrink: true }}
//                       label="Time"
//                       autoFocus
//                       error={Boolean(errors.time?.moment)}
//                       helperText={errors.time?.moment?.message || ''}
//                     />
//                     )}
//                   />
//             </Grid>

//             <Grid item xs={12} sm={6}>  {/* venue */}
//                   <Controller
//                     control={control}
//                     name="venue"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                       <TextField {...register('venue')}
//                         autoComplete="given-name"
//                         name="venue"
//                         fullWidth
//                         id="venue"
//                         InputLabelProps={{ shrink: true }}
//                         label="venue"
//                         autoFocus
//                         error={Boolean(errors.venue)}
//                         {...(errors.venue && {helperText:errors.venue.message})}
//                       />
//                     )}
//                   />
//             </Grid>

//             {/* <Grid item xs={12} sm={6}>  
//                   <Controller
//                     control={control}
//                     name="description"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                       <TextField {...register('description')}
//                         name="description"
//                         type="text"
//                         fullWidth
//                         id="description"
//                         InputLabelProps={{ shrink: true }}
//                         label="description"
//                         autoFocus
//                         error={Boolean(errors.description)}
//                         {...(errors.description && {helperText:errors.description.message})}
//                       />
//                     )}
//                   />
//             </Grid> */}

// <Grid item xs={12} sm={6}>
//           {/* <Controller
//             control={control}
//             // name="description"
//             rules={{ required: true }}
//             render={({ field: { ref, ...field } }) => ( */}
//               <ReactQuill
//                 value={description}
//                 onChange={setDescription}
//                 modules={{ toolbar: true }}
//               />
//             {/* )}
//           /> */}
//           {/* <p>{errors.description?.message}</p> */}
//         </Grid>

//             <Grid item xs={12} sm={6}>  {/* totalTickets */}
//                   <Controller
//                     control={control}
//                     name="totalTickets"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                       <TextField {...register('totalTickets')}
//                         name="totalTickets"
//                         type="number"
//                         fullWidth
//                         id="totalTickets"
//                         InputLabelProps={{ shrink: true }}
//                         label="Total Tickets"
//                         autoFocus
//                         error={Boolean(errors.totalTickets)}
//                         {...(errors.totalTickets && {helperText:errors.totalTickets.message})}
//                       />
//                     )}
//                   />
//             </Grid>
      
//             <Grid item xs={12} sm={6}>  {/* duration */}
//                   <Controller
//                     control={control}
//                     name="duration"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                       <TextField {...register('duration')}
//                         name="duration"
//                         type="text"
//                         fullWidth
//                         id="duration"
//                         InputLabelProps={{ shrink: true }}
//                         label="Duration"
//                         autoFocus
//                         error={Boolean(errors.duration)}
//                         {...(errors.duration && {helperText:errors.duration.message})}
//                       />
//                     )}
//                   />
//             </Grid>

//             <Grid item xs={12} sm={6}>  {/* price */}
//                   <Controller
//                     control={control}
//                     name="price"
//                     rules={{ required: true }}
//                     render={({ field: { ref, ...field } }) => (
//                       <TextField {...register('price')}
//                         name="price"
//                         type="text"
//                         fullWidth
//                         id="price"
//                         InputLabelProps={{ shrink: true }}
//                         label="Price"
//                         autoFocus
//                         error={Boolean(errors.price)}
//                         {...(errors.price && {helperText:errors.price.message})}
//                       />
//                     )}
//                   />
//             </Grid>

//             <Button
//               variant="contained"  
//               color="primary" 
//               type="submit" 
//               sx={{ marginTop: '25px', width: '80%' }}
//               onClick={handleSubmit( onFormSubmit )}
//             >
//               Submit
//             </Button>

//           </Grid>
//         </div>
//       );
// };

// export default CreateEvent;





"use client";
import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import dynamic from 'next/dynamic';
import { fetchAddEvent } from "@/redux/slices/eventSlice";
import { Event } from '@/types/eventTypes';
import Image from "next/image";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface SubmitData {
  time: {
    end_date?: string | undefined;
    start_date: string;
    moment: string;
  };
  title: string;
  image: string;
  totalTickets: number;
  duration: string;
  venue: string;
  price: number;
}

const schema = yup.object().shape({
  title: yup.string().required('Event title is required!!'),
  time: yup.object().shape({
    start_date: yup.string().required('Start date is required'),
    end_date: yup.string(),
    moment: yup.string().required("Time must be provided")
  }),
  totalTickets: yup.number().required('Total number of tickets must be provided'),
  duration: yup.string().required('Duration is required!!'),
  image: yup.string().required('Image is required!!'),
  venue: yup.string().required('Venue is required!!'),
  price: yup.number().required('Price is required!!'),
});

const CreateEvent = () => {
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();
  const dispatch = useDispatch<any>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onFormSubmit = async (data: SubmitData) => {
    const formattedDescription = description.replace(/<[^>]+>/g, '');

    const formDataToSend = new FormData();
    formDataToSend.append("title", data.title);
    formDataToSend.append("start_date", data.time.start_date!.toString());
    formDataToSend.append("end_date", data.time.end_date!.toString());
    formDataToSend.append("moment", data.time.moment.toString());
    formDataToSend.append("description", formattedDescription);
    formDataToSend.append("totalTickets", data.totalTickets.toString());
    formDataToSend.append("venue", data.venue);
    formDataToSend.append("duration", data.duration);
    formDataToSend.append("price", data.price.toString());
    formDataToSend.append("image", image);

    dispatch(fetchAddEvent(formDataToSend));
    router.push("/dashboard");
  };

  const handleImageChange = (e: any) => {
    const selectedFile = URL.createObjectURL(e.target.files[0]);
    setPreview(selectedFile);
    const selectedFiles = e.target.files[0];
    setImage(selectedFiles);
  };

  return (
    <div className="container">
      <Grid container spacing={2} style={{ justifyContent: 'center', marginBottom: '20px' }}>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ textAlign: "center", margin: "30px 0 10px 0" }}>
            Create Event
          </Typography>
        </Grid>

        {preview && (
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Image src={preview} alt="Preview" style={{ width: "30%" }} />
          </Grid>
        )}

        <Grid item xs={12} style={{ marginBottom: "20px" }}>
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
          <p>{errors.image?.message}</p>
        </Grid>

        <Grid item xs={12} sm={6}>
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
                {...(errors.title && { helperText: errors.title.message })}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
                {...(errors.time?.start_date && { helperText: errors.time?.start_date.message })}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
                {...(errors.time?.end_date && { helperText: errors.time?.end_date.message })}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="time.moment"
            rules={{ required: true }}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...register('time.moment')}
                autoComplete="given-name"
                name="time.moment"
                type="time"
                fullWidth
                id="moment"
                InputLabelProps={{ shrink: true }}
                label="Time"
                autoFocus
                error={Boolean(errors.time?.moment)}
                helperText={errors.time?.moment?.message || ''}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
                label="Venue"
                autoFocus
                error={Boolean(errors.venue)}
                {...(errors.venue && { helperText: errors.venue.message })}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ReactQuill
            value={description}
            onChange={setDescription}
            modules={{ toolbar: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
                {...(errors.totalTickets && { helperText: errors.totalTickets.message })}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
                {...(errors.duration && { helperText: errors.duration.message })}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
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
                {...(errors.price && { helperText: errors.price.message })}
              />
            )}
          />
        </Grid>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: '25px', width: '80%' }}
          onClick={handleSubmit(onFormSubmit)}
        >
          Submit
        </Button>
      </Grid>
    </div>
  );
};

export default CreateEvent;
