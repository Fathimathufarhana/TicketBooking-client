
"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import "@/style/style.css"
import { fetchDeleteEvent, fetchEvents } from '@/redux/slices/eventSlice';
import { RootState } from '@/redux/store';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';


const Events = () => {

    const [searchValue, setSearchValue] =useState<string>("");
    const [priceFilter, setPriceFilter] = useState<number>(0);

    const router = useRouter()
    const dispatch = useDispatch<any>()
    const fetchEvent = useSelector((state:RootState) => state.allEvents.eventData)

    
    useEffect(() => {
        dispatch(fetchEvents({ q:searchValue, price:priceFilter }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchValue, priceFilter])

    const handleDelete = async (event_id : string) => {
        await dispatch(fetchDeleteEvent({ event_id }))
        dispatch(fetchEvents({ q: searchValue, price: priceFilter }))
    }

    const columns: GridColDef[] = [
        { field:"_id", headerName:"Id", width:50, headerAlign:"center", align:"center",
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
        },
        { field:"image", headerName:"Image", width:100, headerAlign:"center", align:"center",
            renderCell: (fetchEvent) => {
                return(
                    <div style={{ alignContent:"center", display:'flex', flexWrap:"wrap"}}>
                        <Image 
                            src={fetchEvent.row.image} 
                            alt="employee" 
                            style={{width:"50px", height:"50px", borderRadius:"50%"}} 
                        />
                    </div>
                )
            }
        },
        { field:"title", headerName:"Title", width:100, headerAlign:"center", align:"center"},
        { field:"description", headerName:"Description", width:200, headerAlign:"center", align:"center"},
        { field:"totalTickets", headerName:"Total Tickets", width:80, headerAlign:"center", align:"center"},
        { field:"availability", headerName:"Available Tickets", width:80, headerAlign:"center", align:"center"},
        { field:"duration", headerName:"Duration", width:80, headerAlign:"center", align:"center"},
        { field:"price", headerName:"Price", width:80, headerAlign:"center", align:"center"},
        { field:"venue", headerName:"Venue", width:90, headerAlign:"center", align:"center"},
        { field:"start_date", headerName:"Start Date", width:100, headerAlign:"center", align:"center",
            renderCell: (fetchEvent) => {
                return(
                    <>
                        {new Date(fetchEvent.row.time.start_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </>
                )
            }
        },
        { field:"end_date", headerName:"End Date", width:100, headerAlign:"center", align:"center",
            renderCell: (fetchEvent) => {
                return(
                    <>
                        {new Date(fetchEvent.row.time.end_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </>
                )
            }
        },
        { field:"moment", headerName:"Time", width:90, headerAlign:"center", align:"center",
            renderCell: (fetchEvent) => {
                const [hours, minutes] = fetchEvent.row.time.moment.split(":");
                const currentDate = new Date();
                currentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                return formattedTime;
            }
        },
        { field:"actions", headerName:"Action", width:180, headerAlign:"center", align:"center",
            renderCell: (fetchEvent) => {
                return(
                    <>
                        <Button onClick={() => router.push(`/events/view/${fetchEvent.row._id}/edit`)} variant="contained">
                            Edit
                        </Button>
                        &nbsp;
                        <Button variant="contained" color="error" onClick={() => handleDelete(fetchEvent.row._id)}>
                        Delete
                        </Button>
                    </>
                )
            }
        }
    ]

  return (

    <Box>

      <Box display="flex" justifyContent="space-between" margin="15px" alignItems="center">
        <Box className='search'>
          <SearchIcon />
          <input type="text" placeholder="Search..." className='input' />
        </Box>
          <FormControl 
          variant="filled"
          sx={{ m: 1 ,width: "300px" }}
        >
          <InputLabel id="demo-simple-select-label">All Price</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={(e)=> setPriceFilter(e.target.value as number)}
              value={priceFilter}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value={1000}>Below &#x20B9;1000</MenuItem>
                <MenuItem value={500}>Below &#x20B9;500</MenuItem>
                <MenuItem value={200}>Below &#x20B9;200</MenuItem>
                <MenuItem value={100}>Below &#x20B9;100</MenuItem>
            </Select>
        </FormControl>
        <Grid>Total Count: {fetchEvent.length}</Grid>
        <Button onClick={() => router.push('/events/add')}> 
          Add New 
        </Button>
      </Box>

      <DataGrid
        rowHeight={100}
        columns={columns}
        rows={fetchEvent}
        getRowId={(fetchEvent) => fetchEvent._id}
        initialState={{
          pagination: { paginationModel: { pageSize: 3 } },
        }}
        pageSizeOptions={[3, 5, 10]}
      />
    </Box>
    
  );
}

export default Events
