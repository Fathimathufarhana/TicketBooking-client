import { Event } from '@/types/eventTypes'
import { Box, Card, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import {InlineShareButtons} from 'sharethis-reactjs';

interface Props {
    data: Event
}

const EventDetailsTab = ({ data }: Props) => {

  return (
    <>
      <Grid item xs={12} padding='10px 30px'>
          <Box>
            <Typography fontSize='26px' fontWeight='bold'>
             {`${data.title} on ${new Date(data.time.start_date!).toLocaleDateString('en-AU', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })} at ${data.time.moment}`}
            </Typography>
          </Box>
          <Box>

            <Typography fontSize='14px' color='gray'> starts on {
              new Date(data.time.start_date!).toLocaleDateString('en-AU', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })} | {data.time.moment} | {data.duration}
            </Typography>
          </Box>
      </Grid>

      <Card>
        <CardMedia
          component="img"
          height="300"
          sx={{borderRadius:'10px'}}
          image={data.image}
          alt={data.title}
        />
            
        <CardContent>
          <Box textAlign='center'>

            <IconButton aria-label="share">
              <InlineShareButtons
                config={{
                  alignment: 'center', 
                  color: 'social',  
                  enabled: true,    
                  font_size: 16,      
                  labels: null,   
                  language: 'en',       
                  networks: [          
                    'whatsapp',
                    'messenger',
                    'facebook',
                    'twitter',
                    'linkedin',
                  ],
                  padding: 12,      
                  radius: 4,         
                  show_total: true,
                  size: 40,           
                }}
              />
            </IconButton>

          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default EventDetailsTab
