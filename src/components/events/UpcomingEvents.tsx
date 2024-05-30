// "use client"
// import axios from 'axios'
// import { Box } from "@mui/material"
// import React, { useEffect, useState } from 'react'
// // import PopularBookCard from '@/components/PopularBookCard';
// // import "./card.css"
// import url from '@/config/url';
// import { defaultEventData, Event } from '@/types/eventTypes'
// import UpcomingEventCard from '../cards/UpcomingEventCard'
// import { useSelector } from 'react-redux';

// const UpcomingEvents = () => {
//     const [upcomingEvents , setUpcomingEvents] = useState<Event[]>()
//     // const [fetchEvents, setFetchEvents] = useState<Event[]>(defaultEventData)
//   const fetchEvent = useSelector((state:any) => state.allEvents.eventData)


//   const storedToken = localStorage.getItem("access_token");
//   const headers = { Authorization: `Bearer ${storedToken}` };

// //   const fetchEventsData =  () => {
// //           axios.post(`${url.serverUrl}/events/list`,null,
// //           {headers})
// //           .then((res) => {
// //             const fetchData = res.data
// //             setFetchEvents(fetchData.data);
// //           })
// //   };

// //   useEffect(() => {
// //     fetchEventsData()
// //   },[])
  
//   useEffect(() => {
//     const filteredList = fetchEvent.sort((a:any,b:any) => b.star_rating - a.star_rating  ).slice(0, 2)
//     setUpcomingEvents(filteredList)
//   },[fetchEvent])


//   return ( 
//     <Box sx={{ 
//         display: 'flex' ,
//         gap: "30px"
//     }}>
//         {upcomingEvents?.map((items:Event, index:number) => {
//             return <UpcomingEventCard data={items} key={index} />;
//         })}
//     </Box>
//   )
// }

// export default UpcomingEvents