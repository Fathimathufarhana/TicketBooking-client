"use client"

import "@/style/style.css"
import { Box, Tab } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Event } from '@/types/eventTypes';
import { SyntheticEvent, useEffect, useState } from 'react';
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import MuiTabList from '@mui/lab/TabList'
import EventDetailsTab from './tab/EventDetailsTab';
import EventAboutTab from './tab/EventAboutTab';


interface Props {
    tab: string
    data: Event
}

const ViewEvents = ({ tab, data }: Props) => {
    
    const [activeTab, setActiveTab] = useState('details')

    const router = useRouter()

    const handleChange = (event: SyntheticEvent, value: string)=> {
      setActiveTab(value)
      router.push(`/events/view/${data._id}/${value}`)
  }
  useEffect(()=> {
      if (tab && tab !== activeTab ) {
          setActiveTab(tab)
      }
  }, [])

  return (

    <TabContext value={activeTab}>
    <MuiTabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
    >
        <Tab value='details' label='Details' />
        <Tab value='about' label='About'  />

    </MuiTabList>
    <Box sx={{ mt: 4 }}>
            <>
                <TabPanel sx={{ p: 0 }} value='details'>
                   <EventDetailsTab  data={data}/>
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='about'>
                   <EventAboutTab data={data}/>
                </TabPanel>
            </>
    </Box>
</TabContext>
  );
}


export default ViewEvents

