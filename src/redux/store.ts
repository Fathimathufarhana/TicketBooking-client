import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import eventSlice from "./slices/eventSlice";
import bookingSlice from "./slices/bookingSlice";

export const store = configureStore({
    reducer: {
        allEvents: eventSlice,
        allBookings: bookingSlice
    }
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;