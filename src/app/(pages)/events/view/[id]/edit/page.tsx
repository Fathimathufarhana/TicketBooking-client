
"use client"
import EditEvent from '@/components/events/EditEvent'
import url from '@/config/url'
import { defaultEventData, Event } from '@/types/eventTypes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Props {
    params: {
        id: string
    }
} 


const Page = ({params}:Props) => {
    console.log(params,"edit event")
    const [event,setEvent] = useState<Event>(defaultEventData)

      useEffect(() => {
        const storedToken = localStorage.getItem("access_token");
        const headers = { Authorization: `Bearer ${storedToken}` };
        const fetchEvents = async () => {
          const response = await axios.post(`${url.serverUrl}/events/view`,{ event_id: params.id },
            {headers})
            .then((res) => {
              const fetchData = res.data
              setEvent(fetchData.data);
            }
          )
        };
          fetchEvents()
        },[params.id])
        console.log(event,"events from edit page")
    return (
        <div>
          <EditEvent params={event}/>
        </div>
  )
}

export default Page