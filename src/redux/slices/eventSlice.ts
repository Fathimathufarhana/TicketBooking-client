import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import url from "@/config/url";

interface Data {
    _id: string
  title: string
  time: {
    start_date: Date
    end_date: Date
    moment: string
  }
  location: {
    latitude: number
    longitude: number
  }
  description: string
  totalTickets: number
  availability: number
  duration: string
  image: string
  price: number
}

interface Event {
    eventData : Data[]
}

const initialState : Event = {
    eventData: []
}

interface Params {
    q: string
    price: number
}

interface Event_id {
    event_id : string
}

  export const eventSlice = createSlice({
        name: "events",
        initialState,
        reducers: {
            addEvent: (state, action: PayloadAction<Data>) => {
               state.eventData.push(action.payload)
            },
            listEvents: (state, action: PayloadAction<Data[]>) => {
                state.eventData = (action.payload)
            },
            editEvent: (state, action: PayloadAction<Data>) => {
                state.eventData.push(action.payload)
            },
            deleteEvent: () =>{}
        }
    })

    export const fetchAddEvent = ( formDataToSend: FormData ):
    AppThunk => async(dispatch) => {
            const storedToken = localStorage.getItem("access_token")!;
        const response = await axios.post(`${url.serverUrl}/events/create`,formDataToSend, {
            headers:{ Authorization: `Bearer ${storedToken}` }
        });
        console.log("fetchAddEvent")
            console.log(response.data.data,"fetchAddEvent")
            dispatch(addEvent(response.data.data)) 
       
    }

    export const fetchEvents = ( params: Params ) :
        AppThunk<Promise<void>> => async( dispatch ) => {

            const storedToken = localStorage.getItem("access_token")!
            const response = await axios.post(`${url.serverUrl}/events/list`, params,
                { headers:{ Authorization: `Bearer ${storedToken}` } }
            );
            dispatch(listEvents(response.data.data))
        }
   
    export const fetchEditEvent = ( formDataToSend: FormData ):
    AppThunk<Promise<void>> => async( dispatch ) => {
        const storedToken = localStorage.getItem("access_token")!
        const response = await axios.patch(`${url.serverUrl}/events/edit` , 
            formDataToSend ,
            { headers:{ Authorization: `Bearer ${storedToken}` } }
        );
        dispatch(editEvent(response.data.data))
    }

    export const fetchDeleteEvent = ( event_id : Event_id ):
        AppThunk => async( dispatch ) => {
            const storedToken = localStorage.getItem("access_token")!
            const response = await axios.patch(`${url.serverUrl}/events/delete`,event_id, {
                headers:{ Authorization: `Bearer ${storedToken}` }
            })
            dispatch(deleteEvent(response.data.message)) 
        }


export const { listEvents, addEvent, deleteEvent, editEvent } = eventSlice.actions;
export default eventSlice.reducer;