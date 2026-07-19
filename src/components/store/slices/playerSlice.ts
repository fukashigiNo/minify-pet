import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentTrack: null,
    queue: [],
    isPlaying: false,
    currentTrackIndex: 0
}

export const  playerSlice = createSlice({
    name: "playerSlice",
    initialState: initialState,
    reducers: {
        setCurrentTrack (state, action) {
            state.currentTrack = action.payload.track
            state.queue = action.payload.playlist
            state.currentTrackIndex = action.payload.index
            state.isPlaying = true
        },
        setIsPlaying(state) {
            state.isPlaying = !state.isPlaying
        },
        nextTrack(state, action) {
            const nextTrack = state.currentTrackIndex + 1
            if (nextTrack < state.queue.length) {
                state.currentTrackIndex = nextTrack
                state.currentTrack = state.queue[nextTrack]
            } else {
                state.currentTrackIndex = 0
                state.currentTrack = state.queue[0]
            }
        }, 
        previousTrack(state) {
            const previousTrack = state.currentTrackIndex - 1
            const lastIndex = state.queue.length -1
            if(previousTrack >= 0) {
                state.currentTrackIndex = previousTrack
                state.currentTrack = state.queue[previousTrack]
            } else {
                state.currentTrackIndex =  lastIndex
                state.currentTrack = state.queue[lastIndex]
            }
        }
    }
})

export const {
 setCurrentTrack,
setIsPlaying,
nextTrack,
previousTrack
} = playerSlice.actions

export default playerSlice.reducer