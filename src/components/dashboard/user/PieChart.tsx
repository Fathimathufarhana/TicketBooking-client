"use client"
import url from '@/config/url';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useEffect, useState } from 'react';

// interface Gender {
//     gender: string[]
// }

const Piechart = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // console.log('Fetching data for pie chart');
    
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem("access_token");
        const response = await axios.post(
          `${url.serverUrl}/user/list`,
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

  // Aggregate gender data
  const genderCounts = data.reduce((acc, user) => {
    if (user.gender) {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare data for PieChart
  const chartData = Object.keys(genderCounts).map((gender, index) => ({
    id: index,
    value: genderCounts[gender],
    label: gender,
  }));

  return (
    <PieChart
      sx={{ marginBottom: '50px' }}
      series={[
        {
          data: chartData,
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default Piechart;
