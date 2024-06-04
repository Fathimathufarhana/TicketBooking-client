
import { Box, Button, Dialog, DialogContent } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

interface Data {
   data: {
    _id: string
    date: Date
    event: {
        title: string
        venue: string
        _id: string
    }
    tickets: number
    qrCodePath: string
   }
}

const BookingsCard = ({data}: Data) => {
    const [open, setOpen] = useState(false);


    const handleClickOpen = (id: string) => {
        console.log(id,"my booking id from click")
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    
    <Card sx={{ minWidth: 150, display:'flex' }} >
        <CardContent>
            <Typography variant="h5" component="div">
                {data.event.title}
            </Typography>
            <Typography variant="body2">
                location: {data.event.venue}
            </Typography>
            <Typography variant="body2">
                tickets booked: {data.tickets}
            </Typography>
            <Typography variant="body2">
                {new Date(data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
            </Typography>

            <Button onClick={()=>{
                handleClickOpen(data._id)
            }}>Get QR code</Button>

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
            >
                <DialogContent>
                    <Box 
                        component='img'
                        src={data.qrCodePath}
                        alt='qrcode'
                    />
                </DialogContent>
            </Dialog>
        </CardContent>
    </Card>
  );
}


export default BookingsCard;