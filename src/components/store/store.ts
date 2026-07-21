import { configureStore } from "@reduxjs/toolkit";
import { playerSlice} from "./slices";

export const store = configureStore({
    reducer: {
        playerSlice: playerSlice.reducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch