
"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import "@/style/style.css"
import { RootState } from '@/redux/store';
import { fetchBookings } from '@/redux/slices/bookingSlice';


const BookingList = () => {

    const dispatch = useDispatch<any>()
    const BookingDetails = useSelector((state:RootState) => state.allBookings.eventBookingData)

    
    useEffect(() => {
        dispatch(fetchBookings())
    },[BookingDetails])


    const columns: GridColDef[] = [
        { field:"_id", headerName:"Id", width:50, headerAlign:"center", align:"center",
            renderCell: (params) => params.api.getAllRowIds().indexOf(params.id)+1
        },
        { field:"title", headerName:"Event Name", width:150, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                return(
                    (fetchBooking.row.event.title)
                )
            }
        },
        { field:"date", headerName:"Booked Date", width:150, headerAlign:"center", align:"center",
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
        { field:"time", headerName:"Time", width:100, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                const [hours, minutes] = fetchBooking.row.event.time.moment.split(":");
                const currentDate = new Date();
                currentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                return formattedTime;
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
                    (fetchBooking.row.user?.first_name)
                )
            }
        },
        { field:"email", headerName:"email", width:200, headerAlign:"center", align:"center",
            renderCell: (fetchBooking) => {
                return(
                    (fetchBooking.row.user?.email)
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
