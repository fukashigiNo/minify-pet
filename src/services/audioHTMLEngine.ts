class AudioHTMLEngine {
    private audio = typeof window !== "undefined" ? new Audio() :  null

    async loadTrack(url: string) {
        if (!this.audio) return 
        const audio = this.audio
        const metadataLoaded = new Promise<void>((resolve) => {
            const finish = () => {
                audio.removeEventListener("loadedmetadata", finish)
                audio.removeEventListener("error", finish)
                resolve()
            }

            audio.addEventListener("loadedmetadata", finish, { once: true })
            audio.addEventListener("error", finish, { once: true })
        })

        audio.src = url
        audio.load()
        await metadataLoaded
    }

    play() {
        void this.audio?.play()
    }

    pause() {
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

    setOnEnded(callback: () => void) {
        if (this.audio) this.audio.onended = callback
    }

    setIsLooped(value: boolean) {
        if(this.audio) this.audio.loop = value
    }
}

export const audioHTMLEngine = new AudioHTMLEngine()