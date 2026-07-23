"use client"
import { Button, Icon } from "@/components/global"
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/components/store/hooks"
import { previousTrack, nextTrack, setIsPlaying } from "@/components/store/slices"
import { audioEngine } from "@/services"
import { useEffect } from "react"

export default function PlayerBar ()  {
    const track = useAppSelector(state => state.playerSlice.currentTrack)
    const isPlaying = useAppSelector(state => state.playerSlice.isPlaying)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!track?.src) return

        audioEngine.setOnEnded(() => {
            dispatch(nextTrack())
            }
        )

        async function startAudio() {
            await audioEngine.loadTrack(track!.src);
            audioEngine.play()
        }

        startAudio()
    }, [track?.src])

    const handleToggle = () => {
        if (isPlaying) {
            audioEngine.pause()
        } else {
            audioEngine.play()
        }
        dispatch(setIsPlaying())
    }

    if(!track) return null

  return (
    <div className="fixed flex items-center justify-around px-30 bottom-0 left-0 w-full h-18 bg-[#110d1bff] border-t border-zinc-500/50">
        <div className="flex items-center  gap-4">
            <div className="w-12 h-12 bg-radial-[at_25%_25%] from-[#FFFFFF]  to-[#EF33E7] to-75% rounded-[10px]" />
            <div>
                <p className="text-[15px] font-bold">{track.trackName}</p>
                <p className="text-[12px] text-white/60">{track.trackAuthor}</p>
            </div>
        </div>

        <div className="flex items-center gap-6">
            <Button className="cursor-pointer" handlePress={() => dispatch(previousTrack())}>
                <Icon icon={SkipBack} size={16} color="#FFFFFF"/>
            </Button>
            <Button 
                handlePress={() => {handleToggle()}}
                className="cursor-pointer bg-radial-[at_25%_25%] from-[#FF6BE7]  to-[#EF33E7] to-75% p-3 rounded-full">
                {isPlaying ? <Icon icon={Pause} size={19} color="black" fill="black" /> : 
                <Icon icon={Play} size={19} color="black" fill="black" />}
            </Button>
            <Button className="cursor-pointer " handlePress={() => dispatch(nextTrack())}>
                <Icon icon={SkipForward} size={16} color="#FFFFFF"/>
            </Button>
        </div>
    </div>
  )
}


