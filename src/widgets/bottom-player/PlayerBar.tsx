"use client"
import { Button, Icon, SeekBar, VolumeBar } from "@/components/global"
import { Play, Pause, SkipForward, SkipBack, Repeat, VolumeX, Volume1 } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/components/store/hooks"
import { previousTrack, nextTrack, setIsPlaying, setIsLooped } from "@/components/store/slices"
import { audioEngine } from "@/services"
import { useEffect, useState } from "react"

export default function PlayerBar ()  {
    const track = useAppSelector(state => state.playerSlice.currentTrack)
    const isPlaying = useAppSelector(state => state.playerSlice.isPlaying)
    const isLoop = useAppSelector(state => state.playerSlice.isLooped)
    const [volume, setVolume] = useState(audioEngine.getVolume())
    const [isVolOpen, setIsVolOpen] = useState<boolean>(false)
    const [currentTime, setCurrentTIme] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const dispatch = useAppDispatch()

    const toggleLoop = () => {
        const nextState = !isLoop
        dispatch(setIsLooped())
        audioEngine.setIsLooped(nextState)
    }

    useEffect(() => {
        if(!track?.src) return

        audioEngine.setOnEnded(() => {
                dispatch(nextTrack())
            }
        )

        async function startAudio() {
            await audioEngine.loadTrack(track!.src);
            audioEngine.play()
            setDuration(audioEngine.getDuration())
        }

        startAudio()
    }, [track?.src])

    useEffect(() => {
        if(!isPlaying) return

        const interval = setInterval(() => {
            setCurrentTIme(audioEngine.getCurrentTime())
        }, 200)

        return () => clearInterval(interval)
    }, [isPlaying])

    const handleToggle = () => {
        if (isPlaying) {
            audioEngine.pause()
        } else {
            audioEngine.play()
        }
        dispatch(setIsPlaying())
    }

    const handleChangeVolume = (newVolume: number) => {
        setVolume(newVolume);
        audioEngine.setVolume(newVolume)
    }
    if(!track) return null

  return (
    <div className="fixed flex flex-col md:flex-row items-center justify-around
            gap-2 md:gap-0 px-3 sm:px-6 md:px-12 lg:px-30
            py-2 md:py-0 bottom-0 left-0 w-full z-60
            md:h-18 bg-[#110d1bff] border-t border-zinc-500/50">

        <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-radial-[at_25%_25%] from-[#FFFFFF] to-[#EF33E7] to-75% rounded-[10px]" />
                <div className="min-w-0">
                    <p className="text-[13px] md:text-[15px] font-bold text-white truncate">{track.trackName}</p>
                    <p className="text-[11px] md:text-[12px] text-white/60 truncate">{track.trackAuthor}</p>
                </div>
            </div>

            {/* play/pause доступен и в верхнем ряду на мобильных, чтобы не тянуться далеко */}
            <Button
                handlePress={() => {handleToggle()}}
                className="md:hidden cursor-pointer bg-radial-[at_25%_25%] from-[#FF6BE7] to-[#EF33E7] to-75% p-2.5 rounded-full shrink-0">
                {isPlaying ? <Icon icon={Pause} size={16} color="black" fill="black" /> :
                <Icon icon={Play} size={16} color="black" fill="black" />}
            </Button>
        </div>

        <div className="w-full md:w-auto md:flex-1 md:mx-6">
            <SeekBar
                currentTime={currentTime}
                duration={duration}
                seek={(newTime) => {
                    setCurrentTIme(newTime)
                    audioEngine.seek(newTime)
                }}
            />
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6 w-full md:w-auto">
            <div className="relative flex items-center justify-center">
                {isVolOpen && <VolumeBar volume={volume} handleVolumeChange={handleChangeVolume} />}
                <Button
                className="cursor-pointer"
                handlePress={() => setIsVolOpen(!isVolOpen)}
                >
                    <Icon icon={volume === 0 ? VolumeX : Volume1 } size={16} color={isVolOpen ? "#EF33E7" : "white"}/>
                </Button>
            </div>
            <Button className="cursor-pointer" handlePress={() => dispatch(previousTrack())}>
                <Icon icon={SkipBack} size={16} color="#FFFFFF"/>
            </Button>
            <Button
                handlePress={() => {handleToggle()}}
                className="hidden md:inline-flex cursor-pointer bg-radial-[at_25%_25%] from-[#FF6BE7] to-[#EF33E7] to-75% p-3 rounded-full">
                {isPlaying ? <Icon icon={Pause} size={19} color="black" fill="black" /> :
                <Icon icon={Play} size={19} color="black" fill="black" />}
            </Button>
            <Button className="cursor-pointer" handlePress={() => dispatch(nextTrack())}>
                <Icon icon={SkipForward} size={16} color="#FFFFFF"/>
            </Button>
            <Button className="cursor-pointer" handlePress={toggleLoop}>
                {isLoop ? <Icon icon={Repeat} color="#FF6BE7" size={16} /> :
                <Icon icon={Repeat} color="white" size={16} /> }
            </Button>
        </div>
    </div>
  )
}