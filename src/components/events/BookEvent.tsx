import { Event } from '@/types/eventTypes'
import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import EventIcon from '@mui/icons-material/Event';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchAddBookEvent } from '@/redux/slices/bookingSlice';
import dayjs, { Dayjs } from 'dayjs';
import QRCodeGenerator from '@/components/QRcode/QRCodeGenerator';
import url from '@/config/url';

interface Props {
    data: Event
}

const BookEvent = ({data}: Props) => {
    console.log(data, "Book event (event details)")

    const [counter, setCounter] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleDateChange = (newValue: Dayjs | null) => {
        setSelectedDate(newValue);
        console.log(newValue?.toString(), "selectedDate");
    }

    const dispatch = useDispatch<any>()

    const {
        register,
        handleSubmit,
    } = useForm()
    
    const onSubmit = handleSubmit(() => {
        const selectedDateAsDate = selectedDate ? selectedDate.toDate() : undefined;
        dispatch(fetchAddBookEvent({ event_id: data._id, tickets: counter, date: selectedDateAsDate }))
            .then(() => {
                setBookingSuccess(true); 
                alert('Your ticket has been booked successfully!');
            })
            .catch((error: string) => {
                console.error('Error booking event:', error);
            });
    });
    

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
                            {startDate.format('ddd, D MMM')}  -  {endDate.format('ddd, D MMM')}
                        </Typography>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} sx={{ color: 'blue' }}  {...register('date')}>
                                <DatePicker
                                    label="Choose Date"
                                    shouldDisableDate={disableDates}
                                    onChange={handleDateChange}
                                />
                            </DemoContainer>
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
                            <Box display='flex' alignItems='center' {...register('tickets')}>
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

                {bookingSuccess && (
                    <Box marginTop="20px" textAlign="center">
                        <QRCodeGenerator value={`${url.serverUrl}/booking/view${data._id}`} size={100} />
                    </Box>
                )}
            </Card>
        </>
    )
}

export default BookEvent
