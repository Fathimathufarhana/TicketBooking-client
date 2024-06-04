"use client"
import url from '@/config/url';
import { User } from '@/types/userTypes';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Piechart = () => {
  const [data, setData] = useState<User[]>([]);
  console.log(data,'usr piechart')

  useEffect(() => {
    
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

  type GenderCounts = {
    [gender: string]: number;
  };
  
  const genderCounts: GenderCounts = data.reduce((acc, user) => {
    if (user.gender) {
      acc[user.gender] = (acc[user.gender] || 0) + 1;
    }
    return acc;
  }, {} as GenderCounts);
  

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
