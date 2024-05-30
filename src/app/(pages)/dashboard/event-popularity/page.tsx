"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import url from '@/config/url';
import { Card, CardHeader } from '@mui/material';

const EventPopularity = () => {
  const [ticketData, setTicketData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.post(
          `${url.serverUrl}/booking/details`,
          {},
          {
            headers: { Authorization: `Bearer ${storedToken}` }
          }
        );

        if (Array.isArray(response.data.data)) {
          setTicketData(response.data.data);
        } else {
          console.error('API response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTicketData();
  }, []);

  useEffect(() => {
    console.log('Ticket Data:', ticketData);
    processTicketData(ticketData);
  }, [ticketData]);

  const processTicketData = (data: any[]) => {
    // Aggregate ticket sales by event
    const eventCounts: { [eventName: string]: number } = data.reduce((acc, ticket) => {
      if (ticket.event && ticket.event.title) {
        const eventName = ticket.event.title;
        acc[eventName] = (acc[eventName] || 0) + ticket.tickets;
      }
      return acc;
    }, {});

    console.log('Event Counts:', eventCounts);

    // Prepare data for PieChart
    const chartData = Object.keys(eventCounts).map((eventName, index) => ({
      id: index,
      value: eventCounts[eventName] || 0, // Ensure no NaN values
      label: eventName,
    }));

    console.log('Chart Data:', chartData);

    return chartData;
  };

  return (
    <div>
       <Card >
        <CardHeader 
          title='Event Popularity' 
          sx={{ mb: 5 }} 
          width="100%"
          height={340}
        />
      {ticketData.length > 0 ? (
        <PieChart
          sx={{ marginBottom: '50px' }}
          series={[
            {
              data: processTicketData(ticketData),
            },
          ]}
          width={700}
          height={200}
        />
      ) : (
        <div>No data available</div>
      )}
      </Card>
    </div>
  );
}

export default EventPopularity;