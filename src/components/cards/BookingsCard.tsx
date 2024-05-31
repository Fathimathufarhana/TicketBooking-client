
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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
   }
}

const BookingsCard = ({data}: Data) => {
    console.log(data,"BookingsCard")
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
        </CardContent>
    </Card>
  );
}


export default BookingsCard;