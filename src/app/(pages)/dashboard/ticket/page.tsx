"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import url from '@/config/url';
import { format, startOfWeek } from 'date-fns'; // for date manipulation
import type { Ticket } from '@/types/ticketTypes';

const valueFormatter = (value: number | null) => `${value} tickets`;

const chartSetting = {
  yAxis: [
    {
      label: 'Number of Tickets Sold',
    },
  ],
  series: [{ dataKey: 'value', label: 'Tickets Sold by Week', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const Ticket = () => {
  const [data, setData] = useState<Ticket[]>([]);
  console.log(data,'ticket')

  useEffect(() => {
    const fetchData = async () => {
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
          setData(response.data.data);
        } else {
          console.error('API response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  type TicketDataByWeek = {
    [weekStart: string]: number;
  };
  
  const ticketDataByWeek: TicketDataByWeek = data.reduce((acc, ticket) => {
    if (ticket.date) {
      const weekStart = format(startOfWeek(new Date(ticket.date)), 'MM-dd-yyyy');
      acc[weekStart] = (acc[weekStart] || 0) + 1;
    }
    return acc;
  }, {} as TicketDataByWeek);
  

  const chartData = Object.keys(ticketDataByWeek).map((weekStart) => ({
    weekStart,
    value: ticketDataByWeek[weekStart] || 0, 
  }));

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={chartData} 
        xAxis={[
          { scaleType: 'band', dataKey: 'weekStart' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}

export default Ticket;

