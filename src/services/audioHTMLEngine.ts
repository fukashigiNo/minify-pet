class AudioHTMLEngine {
    private audio = typeof window !== "undefined" ? new Audio() :  null

    async loadTrack(url: string) {
        if (!this.audio) return 
        this.audio.src = url
        this.audio.load()
    }

    play() {
        void this.audio?.play()
    }

    pausa() {
        void this.audio?.pause()
    }

    seek(time: number) {
        if(this.audio) this.audio.currentTime = time
    }

    setVolume(v: number) {
        if (this.audio) this.audio.volume = Math.max(0, Math.min(1, v))
    }

    getCurrentTime() {
        return this.audio?.currentTime ?? 0
    }

    getDuration() {
        return this.audio?.duration ?? 0
    }

    setIsLooped() {
        
    }
}

export const audioHTMLEngine = new AudioHTMLEngine()