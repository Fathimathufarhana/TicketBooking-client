import { Event } from '@/types/eventTypes'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

interface Props {
    data: Event
}

const EventAboutTab = ({ data }: Props) => {
  return (
    // <Grid item xs={8}>

    <Box>
      <Typography fontSize='19px' fontWeight='bold' padding='15px 0'>About This Event</Typography>
      <Typography fontSize='14px' letterSpacing='0.5px'>{data.description}</Typography>
    </Box>
// </Grid>
  )
}

export default EventAboutTab
