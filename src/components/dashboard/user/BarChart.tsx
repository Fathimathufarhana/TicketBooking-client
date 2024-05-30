"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import url from '@/config/url';

const valueFormatter = (value: number | null) => `${value} users`;

const chartSetting = {
  yAxis: [
    {
      label: 'Number of Users',
    },
  ],
  series: [{ dataKey: 'value', label: 'Users by Age Group', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const Barchart = () => {
  const [data, setData] = useState<any[]>([]);

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

//   console.log('Fetched data:', data);

  // Aggregate age data into age groups
  const ageGroups = data.reduce((acc, user) => {
    if (user.age !== undefined && user.age !== null) {
      const ageGroup = `${Math.floor(user.age / 10) * 10}-${Math.floor(user.age / 10) * 10 + 9}`;
      acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    }
    return acc;
  }, {});

  // Prepare data for BarChart
  const chartData = Object.keys(ageGroups).map((ageGroup) => ({
    ageGroup,
    value: ageGroups[ageGroup] || 0, // Ensure no NaN values
  }));

  console.log('Chart data:', chartData);

  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={chartData}
        xAxis={[
          { scaleType: 'band', dataKey: 'ageGroup' },
        ]}
        {...chartSetting}
      />
    </div>
  );
}

export default Barchart;
