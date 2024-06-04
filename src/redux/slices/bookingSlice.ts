import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../store"
import axios from "axios"
import url from "@/config/url"

interface Data {
    _id: string
    user: {
        _id: string
        email: string
        first_name: string
        last_name: string
    }
    event: {
        time: {
            start_date: Date
            end_date: Date
            moment: string
        }
        _id: string
        title: string
    }
    date: string
    tickets: number,
}

interface Booking {
    eventBookingData : Data[]
}

const initialState : Booking = {
    eventBookingData: []
}

interface Params {
    event_id : string
    date?: Date
    tickets: number
}

interface Props {
    user_id: string
}

export const eventSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        bookEvent: (state, action: PayloadAction<Data>) => {
           state.eventBookingData.push(action.payload)
        },
        listBookings: (state, action: PayloadAction<Data[]>) => {
            state.eventBookingData = (action.payload)
        },
        listMyBookings: (state, action: PayloadAction<Data[]>) => {
            state.eventBookingData = (action.payload)
        },
    }
})

    export const fetchAddBookEvent = ( params : Params ):
        AppThunk => async(dispatch) => {
            const storedToken = localStorage.getItem("access_token")!;
            const response = await axios.post(`${url.serverUrl}/booking/add`, params, {
                headers:{ Authorization: `Bearer ${storedToken}` }
            });
            dispatch(bookEvent(response.data.data)) 
        }

    export const fetchBookings = (  ) :
        AppThunk<Promise<void>> => async( dispatch ) => {

            const storedToken = localStorage.getItem("access_token")!
            const response = await axios.post(`${url.serverUrl}/booking/details`,
                { headers:{ Authorization: `Bearer ${storedToken}` } }
            );
            dispatch(listBookings(response.data.data))
        }

        export const fetchMyBookings = ( user: Props ) :
        AppThunk<Promise<void>> => async( dispatch ) => {

            const storedToken = localStorage.getItem("access_token")!
            const response = await axios.post(`${url.serverUrl}/booking/mybookings`, user,
            { headers:{ Authorization: `Bearer ${storedToken}` } }
            );
            dispatch(listMyBookings(response.data.data))
        }

export const { bookEvent, listBookings, listMyBookings } = eventSlice.actions;
export default eventSlice.reducer;
