"use client"
import { Heart } from "lucide-react"
import Icon from "./Icon"
import { useAppSelector } from "../store/hooks"
import { useLikeTrack, ITrackData } from "../hooks/useLikeAction"

interface IMusic {
    id: number;
    trackName: string;
    trackAuthor: string;
    trackLength: string;
    src: string;
    handlePress: () => void;
}

export default function MusicCard({
    id,
    trackName,
    trackAuthor,
    trackLength,
    src,
    handlePress
}: IMusic) {
    const likedId = useAppSelector(state => state.playerSlice.likesId)
    const isInitiallyLiked = likedId.includes(id);

    const trackData: ITrackData = { id, trackName, trackAuthor, trackLength, src };

    const { isLiked, toggleLike } = useLikeTrack(trackData, isInitiallyLiked)

    return (
        <div className="flex justify-between items-center mt-4 bg-[#110d1bff] p-3 sm:p-4
                border-b border-zinc-500/50 rounded-t-[10px] hover:bg-[#1d182bff] cursor-pointer"
                onClick={() => handlePress()}
            >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="hidden xs:block sm:block">
                        <p className="text-white/60 text-sm sm:text-base">{id}</p>
                    </div>
                    <div className="flex gap-2 sm:gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-radial-[at_25%_25%] from-[#FFFFFF] to-[#EF33E7] to-75% rounded-[10px]" />
                        <div className="flex flex-col justify-center min-w-0">
                            <p className="text-[13px] sm:text-[15px] font-bold text-white truncate">{trackName}</p>
                            <p className="text-[11px] sm:text-[12px] text-white/60 truncate">{trackAuthor}</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-30 flex flex-col items-center shrink-0 ml-2">
                    <button 
                        className="cursor-pointer z-60 p-2 transition-transform active:scale-90" 
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleLike();
                        }}
                    >
                        { isLiked ? 
                            <Icon icon={Heart} size={16} color="#EF33E7" fill="#EF33E7" /> :
                            <Icon icon={Heart} size={16} color="#EF33E7" />
                        }
                    </button>
                <p className="mt-2 sm:mt-4 text-[12px] sm:text-[13px] text-white/60">{trackLength}</p>
            </div>
        </div>
    )
}