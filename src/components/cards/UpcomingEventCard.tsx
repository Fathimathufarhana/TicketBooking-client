"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Rating, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import Link from "next/link";
import moment from "react-moment";
import { Event } from "@/types/eventTypes";

interface data {
  data: Event;
}

const UpcomingEventCard = ({ data }: data) => {
    // console.log(data,"data")
  return (
    <Box>
      <Card sx={{ maxWidth: 345, minWidth: 345, maxHeight: 650 }}>
        <Link
          href={{ pathname: `/events/view/${data._id}/details` }}
          style={{ textDecoration: "none" }}
        >
          <CardContent className="info">
          <Box sx={{ position: 'relative'}}>
            <CardMedia
              component="img"
              height="320"
              image={data.image}
              alt={data.title}
              title={data.title}
            />
            {
            data.availability === 0 ? 
            <CardMedia className="sold-out-img"
              component="img"
              image="/soldOut.jpeg"
            /> :
            null
            }
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
                <BookOnlineIcon fontSize="inherit"/> {data.availability} Remainings!
              </Typography>

            </Box>
          </CardActions>

          <CardActions className="info">
            <Box display='flex' alignItems='end' justifyContent='space-between'>

              <Typography fontSize='14px' color='#626161'>
                <EventIcon fontSize="inherit"/> {new Date(data.time.start_date!).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'short'
                })}  -  {new Date(data.time.end_date!).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'short'
                })}
              </Typography>

              <Typography fontSize="14px" color='#626161'>
                 <AccessTimeIcon fontSize="inherit"/> {data.time.moment}
                {/* {moment("14.00", ["HH.mm"]).format("hh:mm a")} */}
              </Typography>

            </Box>
            </CardActions>
        </Link>
      </Card>
    </Box>
  );
}


export default UpcomingEventCard
