import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ITrack {
    id: number;
    trackName: string;
    trackAuthor: string;
    trackLength: string;
    photo?: string; 
    src: string;
}


interface ISetTrackPayload {
    track: ITrack;
    playlist: ITrack[];
    index: number;
}


interface IPlayerState {
    currentTrack: ITrack | null;
    queue: ITrack[];
    isPlaying: boolean;
    isLooped: boolean;
    currentTrackIndex: number;
    likesId: number[]
}

const initialState: IPlayerState = {
    currentTrack: null,
    queue: [],
    isPlaying: false,
    isLooped: false,
    currentTrackIndex: 0,
    likesId: []
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
        setIsLooped(state) {
            state.isLooped = !state.isLooped
        },
        setLikedTracks(state, action: PayloadAction<number[]>) {
            state.likesId = action.payload
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
        },
        syncLikeState (state, action: PayloadAction<{trackId: number, isLiked: boolean}>) {
            const { trackId, isLiked } = action.payload;
            if (isLiked && !state.likesId.includes(trackId)) {
                state.likesId.push(trackId);
            } else if (!isLiked) {
                state.likesId = state.likesId.filter(id => id !== trackId);
            }
        }
    }
})

export const {
 setCurrentTrack,
setIsPlaying,
setLikedTracks,
nextTrack,
previousTrack,
setIsLooped,
syncLikeState
} = playerSlice.actions

export default playerSlice.reducer