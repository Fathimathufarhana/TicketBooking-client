import Barchart from '@/components/dashboard/user/BarChart'
import Piechart from '@/components/dashboard/user/PieChart'
import { Box, Card, CardHeader } from '@mui/material'
import React from 'react'

const User = () => {
  return (
    <Box display='flex' justifyContent='space-evenly'>
      <Card >
        <CardHeader 
          title='Gender' 
          sx={{ mb: 5 }} 
          width="100%"
          height={340}
        />
        <Piechart />
      </Card>

      <Card sx={{width:'400px'}}>
        <CardHeader 
          title='Age' 
          sx={{ mb: 5 }} 
          width="100%"
          height={340}
        />
        <Barchart />
      </Card>
    </Box>
  )
}

export default User
