"use client"

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ViewEvents from '@/components/events/ViewEvents';
import { defaultEventData, Event } from '@/types/eventTypes';
import url from '@/config/url';

interface Props {
    params: {
        id: string
    }
}

const EventViewPage = ({params}: Props) => {
  const [events,setEvents] = useState<Event>(defaultEventData)

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const headers = { Authorization: `Bearer ${storedToken}` };
    const fetchEvents = async () => {
      const response = await axios.post(`${url.serverUrl}/events/view`,{ event_id: params.id },
        {headers})
        .then((res) => {
          const fetchData = res.data
          setEvents(fetchData.data);
        })
    };
      fetchEvents()
    },[])


  return (

    <Grid container>
      <Grid item xs={6}>
        {/* <ViewEvents data={events}/> */}
      </Grid>
    </Grid>
   
  )
}

export default EventViewPage
