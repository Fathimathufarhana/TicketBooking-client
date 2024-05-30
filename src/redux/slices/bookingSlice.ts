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
            // try {
                console.log(params,"jj");
                
                const storedToken = localStorage.getItem("access_token")!;
            const response = await axios.post(`${url.serverUrl}/booking/add`, params, {
                headers:{ Authorization: `Bearer ${storedToken}` }
            });
            console.log("fetchAddBookEvent")
                console.log(response.data.data,"fetchAddBookEvent")
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
          console.log(response.data.data,"mybookings")
            dispatch(listMyBookings(response.data.data))
        }

export const { bookEvent, listBookings, listMyBookings } = eventSlice.actions;
export default eventSlice.reducer;



// import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import { AppThunk } from "../store"
// import axios from "axios"
// import url from "@/config/url"

// interface Data {
//     _id: string
//     user: {
//         _id: string
//         email: string
//         first_name: string
//         last_name: string
//     }
//     event: {
//         time: {
//             start_date: Date
//             end_date: Date
//             moment: string
//         }
//         _id: string
//         title: string
//     }
//     date: string
//     tickets: number,
// }

// interface Booking {
//     eventBookingData: Data[],
//     emailStatus: 'idle' | 'sending' | 'sent' | 'failed',
//     emailError: string | null,
// }

// const initialState: Booking = {
//     eventBookingData: [],
//     emailStatus: 'idle',
//     emailError: null,
// }

// interface Params {
//     event_id: string
//     date?: Date
//     tickets: number
// }

// interface Props {
//     user_id: string
// }

// export const eventSlice = createSlice({
//     name: "booking",
//     initialState,
//     reducers: {
//         bookEvent: (state, action: PayloadAction<Data>) => {
//            state.eventBookingData.push(action.payload)
//         },
//         listBookings: (state, action: PayloadAction<Data[]>) => {
//             state.eventBookingData = (action.payload)
//         },
//         listMyBookings: (state, action: PayloadAction<Data[]>) => {
//             state.eventBookingData = (action.payload)
//         },
//         sendEmailStart: (state) => {
//             state.emailStatus = 'sending';
//             state.emailError = null;
//         },
//         sendEmailSuccess: (state) => {
//             state.emailStatus = 'sent';
//         },
//         sendEmailFailure: (state, action: PayloadAction<string>) => {
//             state.emailStatus = 'failed';
//             state.emailError = action.payload;
//         },
//     }
// })

// // Send email function
// const sendEmail = async (email: string, subject: string, body: string) => {
//     const storedToken = localStorage.getItem("access_token")!;
//     await axios.post(
//         `${url.serverUrl}/email/send`,
//         { email, subject, body },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//     );
// };

// export const fetchAddBookEvent = (params: Params): AppThunk => async (dispatch) => {
//     console.log(params, "jj");

//     const storedToken = localStorage.getItem("access_token")!;
//     const response = await axios.post(`${url.serverUrl}/booking/add`, params, {
//         headers: { Authorization: `Bearer ${storedToken}` }
//     });
//     console.log("fetchAddBookEvent")
//     console.log(response.data.data, "fetchAddBookEvent")
    
//     dispatch(bookEvent(response.data.data));
    
//     // Send email after booking
//     const booking = response.data.data;
//     const email = booking.user.email;
//     const subject = `Booking Confirmation for ${booking.event.title}`;
//     const body = `Dear ${booking.user.first_name},\n\nYour booking for the event "${booking.event.title}" on ${booking.date} has been confirmed.\n\nThank you!`;

//     dispatch(sendEmailStart());

//     try {
//         await sendEmail(email, subject, body);
//         dispatch(sendEmailSuccess());
//     } catch (error: any) {
//         dispatch(sendEmailFailure(error.message));
//     }
// }

// export const fetchBookings = (): AppThunk<Promise<void>> => async (dispatch) => {
//     const storedToken = localStorage.getItem("access_token")!
//     const response = await axios.post(`${url.serverUrl}/booking/details`,
//     { headers: { Authorization: `Bearer ${storedToken}` } }
//     );
//     dispatch(listBookings(response.data.data))
// }

// export const fetchMyBookings = (user: Props): AppThunk<Promise<void>> => async (dispatch) => {
//     const storedToken = localStorage.getItem("access_token")!
//     const response = await axios.post(`${url.serverUrl}/booking/mybookings`, user,
//     { headers: { Authorization: `Bearer ${storedToken}` } }
//     );
//     console.log(response.data.data, "mybookings")
//     dispatch(listMyBookings(response.data.data))
// }

// export const { bookEvent, listBookings, listMyBookings, sendEmailStart, sendEmailSuccess, sendEmailFailure } = eventSlice.actions;
// export default eventSlice.reducer;
