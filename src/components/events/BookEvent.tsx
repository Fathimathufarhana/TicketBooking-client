import { Event } from '@/types/eventTypes';
import { Box, Button, Card, Typography, FormHelperText } from '@mui/material';
import React, { useState } from 'react';
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchAddBookEvent } from '@/redux/slices/bookingSlice';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

interface Props {
  data: Event;
}

interface FormValues {
  date: Dayjs | null;
  tickets: number;
}

const BookEvent = ({ data }: Props) => {
  const [counter, setCounter] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const dispatch = useDispatch<any>();
  const router = useRouter();

  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const selectedDateAsDate = formData.date ? formData.date.toDate() : undefined;
    try {
      await dispatch(fetchAddBookEvent({ event_id: data._id, tickets: counter, date: selectedDateAsDate }));
      setBookingSuccess(true);
      alert('Your ticket has been booked successfully!');
      router.push('/payment');
    } catch (error) {
      console.error('Error booking event:', error);
    }
  };

  const handleClick1 = () => {
    setCounter(counter + 1);
  };

  const handleClick2 = () => {
    setCounter(counter - 1);
  };

  const startDate: Dayjs = dayjs(data.time.start_date);
  const endDate: Dayjs = dayjs(data.time.end_date);

  function disableDates(date: Dayjs): boolean {
    return date.isBefore(startDate) || date.isAfter(endDate);
  }

  return (
    <>
      <Card>
        <Box display='flex' gap='20px' padding='15px 0'>
          <Box>
            <EventIcon fontSize='inherit' />
          </Box>
          <Box marginTop='-20px'>

            <Typography color='gray' fontSize='14px'>Date</Typography>
            <Typography fontWeight='bold'>
              {startDate.format('ddd, D MMM')} - {endDate.format('ddd, D MMM')}
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="date"
                control={control}
                rules={{ required: 'Please choose a date' }}
                render={({ field }) => (
                  <>
                    <DatePicker
                      label="Choose Date"
                      shouldDisableDate={disableDates}
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                    {errors.date && (
                        <FormHelperText error>
                        {errors.date.message}
                        </FormHelperText>
                    )}
                  </>
                )}
              />
            </LocalizationProvider>

          </Box>
        </Box>

        <Box display='flex' gap='20px' padding='15px 0'>
          <Box>
            <ConfirmationNumberIcon fontSize='inherit' />
          </Box>

          <Box marginTop='-10px'>
            <Typography fontSize='14px'> Select Tickets </Typography>
            <Box display='flex' columnGap='9pc'>
              <Box display='flex' alignItems='center'>
                {counter === 1 ?
                  <Typography>{counter} Ticket</Typography> :
                  <Typography>{counter} Tickets</Typography>
                }
              </Box>

              <Box>
                <Button onClick={handleClick1} disabled={counter >= data.availability}>
                  <Typography fontSize='20px'>+</Typography>
                </Button>
                {counter}
                <Button onClick={handleClick2} disabled={counter <= 1}>
                  <Typography fontSize='20px'>-</Typography>
                </Button>
              </Box>
              
            </Box>
          </Box>
        </Box>

        <Box display='flex' gap='20px' padding='15px 0'>
          <Box>
            <CurrencyRupeeIcon fontSize='inherit' />
          </Box>
          <Box marginTop='-20px' fontWeight='bold'>
            <Typography color='gray' fontSize='14px'>Total</Typography>
            <CurrencyRupeeIcon fontSize='inherit' />
            {data.price * counter}
          </Box>
        </Box>

        {data.availability !== 0 ?
          <Button
            sx={{ backgroundColor: '#1976d2', width: '100%', color: 'white' }}
            onClick={handleSubmit(onSubmit)}
          >
            Book Now
          </Button>
          :
          <Typography color='red' textAlign='center'>No tickets left!</Typography>
        }
      </Card>
    </>
  );
};

export default BookEvent;
