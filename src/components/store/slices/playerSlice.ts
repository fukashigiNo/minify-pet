import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTrack: "",
    isPlaying: false
}

export const  playerSlice = createSlice({
    name: "playerSlice",
    initialState: initialState,
    reducers: {
        setIsPlaying(state) {
            state.isPlaying = !state.isPlaying
        }
    }
})