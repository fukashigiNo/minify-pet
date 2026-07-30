"use client"
import { formatTime } from "@/utils/format-time"

interface ISeek {
    currentTime: number
    duration: number
    seek: (time: number) => void
}

export default function SeekBar ({
    currentTime,
    duration,
    seek
}: ISeek) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 w-full max-w-md mx-auto select-none">
        
      <span className="text-[11px] sm:text-[12px] text-white/50 w-7 sm:w-8 text-right shrink-0">
        {formatTime(currentTime)}
      </span>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="w-full h-1.5 sm:h-1 bg-zinc-700/60 rounded-lg appearance-none cursor-pointer accent-[#EF33E7] hover:accent-[#FF6BE7] transition-all
                   [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5
                   [&::-webkit-slider-thumb]:sm:w-3 [&::-webkit-slider-thumb]:sm:h-3
                   [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#EF33E7]"
      />

      <span className="text-[11px] sm:text-[12px] text-white/50 w-7 sm:w-8 shrink-0">
        {formatTime(duration)}
      </span>
    </div>
  );
}