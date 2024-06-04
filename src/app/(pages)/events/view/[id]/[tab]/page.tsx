"use client"

import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import EventView from '@/components/events/ViewEvents';
import axios from 'axios';
import { defaultEventData, Event } from '@/types/eventTypes';
import url from '@/config/url';
import BookEvent from '@/components/events/BookEvent';

interface Props {
    params: {
        id: string
        tab: string
    }
}


const EventTabView = ({params}: Props) => {
  const [event,setEvent] = useState<Event>(defaultEventData)
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
  const headers = { Authorization: `Bearer ${storedToken}` };
  const fetchEvent = async () => {
    
        const response = await axios.post(`${url.serverUrl}/events/view`,{ event_id: params.id },
        {headers})
        .then((res) => {
            const fetchData = res.data
            setEvent(fetchData.data);
        })
   
  };
  fetchEvent()
  },[])

  return (
    <>
    <Grid container>
      
      <Grid item xs={8}>
      <EventView tab={params.tab || 'details'} data={event}/>
      </Grid>

      <Grid item xs={4} marginTop='46px'>
        <BookEvent data={event}/>      
      </Grid>

    </Grid>
    </>
   
  )
}

export default EventTabView
