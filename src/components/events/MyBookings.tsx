"use client"
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookingsCard from '../cards/BookingsCard'
import { fetchMyBookings } from '@/redux/slices/bookingSlice'
import "@/style/style.css"

const MyBookings = () => {

    const router = useRouter()
    const dispatch = useDispatch<any>()
    const fetchMyBooking = useSelector((state:any) => state.allBookings.eventBookingData)

    useEffect(() => {
        const user = localStorage.getItem('user_id')!
        dispatch(fetchMyBookings({ user_id: user }))
    },[])
    return (
        <Box className="books container">
            {fetchMyBooking.map((items:any, index:string) => {
                return <BookingsCard data={items} key={index}/>;
            })
            }
        </Box>
    )
}

export default MyBookings
