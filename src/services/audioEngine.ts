class AudioEngine {
    private ctx: AudioContext | null = null;
    private gainNode: GainNode | null = null;
    private currentSource: AudioBufferSourceNode | null = null;
    private audioBuffer: AudioBuffer | null = null;

    private startTime: number = 0;
    private pauseOffset: number = 0;
    private isPlaying: boolean = false

    constructor() {}

    stop(): void {
        if(this.currentSource) {
            this.currentSource.stop();
            this.currentSource.disconnect()
            this.currentSource = null;
        };
        this.pauseOffset = 0;
        this.isPlaying = false;
    }

    private initCtx() {
        if(!this.ctx) {
            const AudioCtx = window.AudioContext || (window as unknown as {webkitAudioContext: typeof AudioContext}) .webkitAudioContext;
            this.ctx = new AudioCtx()

            this.gainNode = this.ctx.createGain()
            this.gainNode.connect(this.ctx.destination)
        }

        if(this.ctx.state === "suspended") return this.ctx.resume();
    }

    async loadTrack (url: string): Promise<void> {
        this.initCtx();
        this.stop()

        try {
            const res = await fetch(url)
            const arrayBuffer = await res.arrayBuffer()

            if(this.ctx) {
                this.audioBuffer = await this.ctx.decodeAudioData(arrayBuffer)
                this.pauseOffset = 0
            }
        } catch(error) {
            console.error("ОШИБКА МБ ЗАГРУЗКА МБ ДЕКОД", error)
        }
    }

    play(offset?: number) : void {
        if (!this.ctx || !this.audioBuffer || !this.gainNode) return;

        if(this.currentSource) {
            this.currentSource.stop()
            this.currentSource.disconnect()
        }
        const startOffset = offset !== undefined ? offset : this.pauseOffset

        this.currentSource = this.ctx.createBufferSource()
        this.currentSource.buffer = this.audioBuffer
        this.currentSource.connect(this.gainNode)

        this.startTime = this.ctx.currentTime - startOffset
        this.currentSource.start(0, startOffset)
        this.isPlaying = true
    }

    pause(): void {
        if(!this.ctx || !this.currentSource || !this.isPlaying) return;

        this.pauseOffset = this.ctx.currentTime - this.startTime
        this.currentSource.stop();
        this.currentSource.disconnect();
        this.currentSource = null;
        this.isPlaying = false;   
    }

    seek(timeInSeconds: number): void {
        if(!this.audioBuffer) return;

        const clampedTime = Math.max(0, Math.min(timeInSeconds, this.audioBuffer.duration))
        this.pauseOffset = clampedTime;

        if(this.isPlaying) {
            this.play(clampedTime)
        }
    }

    setVolume(volume: number):void {
        if(this.gainNode && this.ctx) {
            this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.ctx.currentTime)
        }
    }

    getCurrentTime():number {
        if(!this.ctx || !this.audioBuffer) return 0;
        if(this.isPlaying) {
            return Math.min(this.ctx.currentTime - this.startTime, this.audioBuffer.duration);
        }
        return this.pauseOffset
    }

    getDuration(): number {
        return this.audioBuffer ? this.audioBuffer.duration : 0
    }

    getIsPlaying(): boolean {
        return this.isPlaying
    }
}

export const audioEngine = new AudioEngine()


