import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ITrack {
    id: number;
    trackName: string;
    trackAuthor: string;
    trackLength: string;
    photo?: string; // на случай, если есть обложка
    src: string;
}

// 2. Описываем структуру action.payload для setCurrentTrack
interface ISetTrackPayload {
    track: ITrack;
    playlist: ITrack[];
    index: number;
}

// 3. Описываем начальное состояние стейта
interface IPlayerState {
    currentTrack: ITrack | null;
    queue: ITrack[];
    isPlaying: boolean;
    currentTrackIndex: number;
}

const initialState: IPlayerState = {
    currentTrack: null,
    queue: [],
    isPlaying: false,
    currentTrackIndex: 0
}

export const  playerSlice = createSlice({
    name: "playerSlice",
    initialState: initialState,
    reducers: {
        setCurrentTrack (state, action: PayloadAction<ISetTrackPayload>) {
            state.currentTrack = action.payload.track
            state.queue = action.payload.playlist
            state.currentTrackIndex = action.payload.index
            state.isPlaying = true
        },
        setIsPlaying(state) {
            state.isPlaying = !state.isPlaying
        },
        nextTrack(state) {
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