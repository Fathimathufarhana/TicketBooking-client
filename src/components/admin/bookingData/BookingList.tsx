
"use client"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchDeleteEmployee, fetchEmployees } from '@/redux/slices/employeeSlice';
import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import AddEmployee from '@/components/employee/AddEmployee';
import { useRouter } from 'next/navigation';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import "@/style/style.css"
import { RootState } from '@/redux/store';
import { fetchBookings } from '@/redux/slices/bookingSlice';


const BookingList = () => {

    const router = useRouter()
    const dispatch = useDispatch<any>()
    const BookingDetails = useSelector((state:RootState) => state.allBookings.eventBookingData)

    
    useEffect(() => {
        dispatch(fetchBookings())
    },[])


    const columns: GridColDef[] = [
        { field:"_id", headerName:"Id", width:50, headerAlign:"center", align:"center",
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
        },
        { field:"title", headerName:"Event Name", width:100, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                return(
                    (fetchBooking.row.event.title)
                )
            }
        },
        { field:"date", headerName:"Booked Date", width:200, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                return(
                    <>
                        {new Date(fetchBooking.row.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </>
                )
            }
        },
        { field:"tickets", headerName:"Tickets", width:80, headerAlign:"center", align:"center"},
        { field:"time", headerName:"Time", width:80, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                return(
                    (fetchBooking.row.event.time.moment)
                )
            }
        },
        { field:"price", headerName:"Price", width:80, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                return(
                    (fetchBooking.row.event.price)
                )
            }
        },
        { field:"first_name", headerName:"Booked by", width:100, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                return(
                    (fetchBooking.row.user.first_name)
                )
            }
        },
        { field:"email", headerName:"email", width:150, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                return(
                    (fetchBooking.row.user.email)
                )
            }
        },
     
    ]

  return (

    <Box marginTop='30px'>

      <DataGrid
        rowHeight={100}
        columns={columns}
        rows={BookingDetails}
        getRowId={(BookingDetails) => BookingDetails._id}
        initialState={{
          pagination: { paginationModel: { pageSize: 3 } },
        }}
        pageSizeOptions={[3, 5, 10]}
      />
    </Box>
  );
}

export default BookingList
