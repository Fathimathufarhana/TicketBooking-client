'use client'
import { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import UpcomingEventCard from "../cards/UpcomingEventCard";
import url from '@/config/url'; 
import axios from 'axios';

const UpcomingEvents = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
            const storedToken = localStorage.getItem("access_token")!
                const response = await axios.post(`${url.serverUrl}/events/list`,
            { headers:{ Authorization: `Bearer ${storedToken}` } }
            );
                if (!response) {
                   console.log('Failed to fetch events');
                }
                const data = response.data
                console.log(data,'data')
                // Assuming data is an array of events, update state with fetched events
                setUpcomingEvents(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEventsData();
    }, []);

    return ( 
        <Box sx={{ 
            display: 'flex' ,
            gap: "30px"
        }}>
            {upcomingEvents.map((event, index) => (
                <UpcomingEventCard data={event} key={index} />
            ))}
        </Box>
    );
}

export default UpcomingEvents;
