import { Box, Typography, CardActions, CardContent, CardMedia, Card } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import EventIcon from '@mui/icons-material/Event';
import Link from "next/link";
import { Event } from "@/types/eventTypes";

interface Data {
  data: Event;
}

const EventCard = ({ data }: Data) => {
  const formatTime = (timeString: string) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 345, minWidth: 345, maxHeight: 650 }}>
        <Link href={{ pathname: `/events/view/${data._id}/details` }} style={{ textDecoration: "none" }}>
          <CardContent className="info">
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="320"
                image={data.image}
                alt={data.title}
                title={data.title}
              />
              {data.availability === 0 ? <CardMedia className="sold-out-img" component="img" image="/soldOut.png" /> : null}
            </Box>

            <Typography color='black' fontSize="24px" fontWeight="900" padding='20px 0'>
              {data.title}
            </Typography>
          </CardContent>

          <CardActions className="info">
            <Box display='flex' alignItems='end' justifyContent='space-between'>
              <Typography fontSize="16px" color='#626161'>
                <LocationOnIcon fontSize="inherit"/>{data.venue}
              </Typography>

              <Typography fontSize="14px" color='#626161'>
                <BookOnlineIcon fontSize="inherit"/> {data.availability} Remaining!
              </Typography>
            </Box>
          </CardActions>

          <CardActions className="info">
            <Box display='flex' alignItems='end' justifyContent='space-between'>
              <Typography fontSize='14px' color='#626161'>
                <EventIcon fontSize="inherit"/> {new Date(data.time.start_date!).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })} - {new Date(data.time.end_date!).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
              </Typography>

              <Typography fontSize="14px" color='#626161'>
                <AccessTimeIcon fontSize="inherit"/> {formatTime(data.time.moment)}
              </Typography>
            </Box>
          </CardActions>
        </Link>
      </Card>
    </Box>
  );
};

export default EventCard;
