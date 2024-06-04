import { Event } from '@/types/eventTypes'
import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
    data: Event
}

const EventAboutTab = ({ data }: Props) => {
  return (

    <Box height='61vh'>
      <Typography fontSize='19px' fontWeight='bold' padding='15px 0'>About This Event</Typography>
      <Typography fontSize='14px' letterSpacing='0.5px'>{data.description}</Typography>
    </Box>

  )
}

export default EventAboutTab
