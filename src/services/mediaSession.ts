export function isMediaSessionSupported() {
    return typeof navigator != "undefined" && "mediaSession" in navigator
}

interface ITrackMeta { 
    trackName: string;
    trackAuthor: string;
    photo?: string;
}

export function updateMediaSessionMetaData( track: ITrackMeta ) {
    if  ( !isMediaSessionSupported() ) return 

    navigator.mediaSession.metadata = new MediaMetadata({
        title: track.trackName,
        artist: track.trackAuthor,
        album: "I.H.T.W c I'M.F.I",
        artwork: track.photo 
        ? [
            { src: track.photo, sizes: "96x96" },
            { src: track.photo, sizes: "256x256" },
            { src: track.photo, sizes: "512x512" },
            ] : []
    })
}

export function setMediaSessionPlaybackState(playing: boolean) {
    if ( !isMediaSessionSupported() ) return

    navigator.mediaSession.playbackState = playing ? "playing" : "paused" 
}

export function updateMediaSessionPosition(
    currentTime: number,
    duration: number
) :void {
    if ( !isMediaSessionSupported() || !duration || duration <= 0 ) return
    
    try {
        navigator.mediaSession.setPositionState({
            duration,
            playbackRate: 1,
            position: Math.min(Math.max(0, currentTime), duration),
        })
    } catch {
    }
}

   interface IMediaHandlers {
        play: () => void,
        pause: () => void,
        next?: () => void,
        previous?: () => void,
        seek?: (time: number) => void
    }

    export function bindMediaSessionHandlers(handlers: IMediaHandlers) {
        if ( !isMediaSessionSupported() ) return

        navigator.mediaSession.setActionHandler("play", () => handlers.play())
        navigator.mediaSession.setActionHandler("pause", () => handlers.pause())
        navigator.mediaSession.setActionHandler("previoustrack", handlers.previous ? () =>  handlers.previous!() : null )
        navigator.mediaSession.setActionHandler("nexttrack", handlers.next ? () => handlers.next!() : null)
        navigator.mediaSession.setActionHandler('seekto', (details) => {
            if(details.seekTime != null && handlers.seek) {
                handlers.seek(details.seekTime)
            }
        } )
    }