"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import url from '@/config/url';
import { format, startOfWeek, addWeeks } from 'date-fns'; // Import date-fns for date manipulation

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
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.post(
          `${url.serverUrl}/booking/details`, // Assuming the endpoint is /ticket/list
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

  // console.log('Fetched data:', data);

  // Aggregate ticket data into weeks
  const ticketDataByWeek = data.reduce((acc, ticket) => {
    if (ticket.date) {
      const weekStart = format(startOfWeek(new Date(ticket.date)), 'MM-dd-yyyy');
      acc[weekStart] = (acc[weekStart] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare data for BarChart
  const chartData = Object.keys(ticketDataByWeek).map((weekStart) => ({
    weekStart,
    value: ticketDataByWeek[weekStart] || 0, 
  }));

  // console.log('Chart data:', chartData);

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

