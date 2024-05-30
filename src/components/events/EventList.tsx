"use client"
import React, { useEffect, useState } from 'react'
import { Button, 
  Box, 
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputLabel,
 } from "@mui/material";
 import "../../style/style.css"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '@/redux/slices/eventSlice';
import EventCard from '@/components/cards/EventCard';



const EventList = () => {
  const [priceFilter, setPriceFilter] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>("");
  const [role, setRole] = useState<string | null>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3)

  const router = useRouter()
  const dispatch = useDispatch<any>()
  const fetchEvent = useSelector((state:any) => state.allEvents.eventData)
  
  useEffect(() => {
    const role_user = localStorage.getItem("role")
    setRole(role_user)
    dispatch(fetchEvents({ q:searchValue, price:priceFilter }))
  },[searchValue, priceFilter])
  

  const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = fetchEvent.slice(indexOfFirstPost, indexOfLastPost);
 
  interface Paginate {
    selected : number
  }

  const paginate = ({ selected }: Paginate) => {
		setCurrentPage(selected + 1);
	};
  return (
    <>
      <Box className='add-btn container'>
      { 
        role === "admin" ?
          <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => router.push('/events/add')} >
            Add New
          </Button>   
          : 
        null
      }
      <Grid className="container book-filtres"  sx={{ display: "flex", alignItems: "center" }}>
        <FormControl
          variant="filled"
          sx={{ m: 1 ,width: "100%" }}
        >
          <InputLabel id="demo-simple-select-label">All Price</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e)=> setPriceFilter(e.target.value as number)}
              value={priceFilter}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value={1000}>Below &#x20B9;1000</MenuItem>
                <MenuItem value={500}>Below &#x20B9;500</MenuItem>
                <MenuItem value={200}>Below &#x20B9;200</MenuItem>
                <MenuItem value={100}>Below &#x20B9;100</MenuItem>
            </Select>
        </FormControl>


          <TextField
            id="search"
            name="search"
            label="Search"
            sx={{ width: "100%" }}
            onChange={(e)=> setSearchValue(e.target.value)}
          />
      </Grid>

      </Box>
      <Box className="books container">
        {fetchEvent.map((items:any, index:string) => {
            return <EventCard data={items} key={index}/>;
          })
        }
      </Box>
    </>
  )
}

export default EventList
