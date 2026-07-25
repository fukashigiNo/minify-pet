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
    <div className="flex items-center gap-3 w-full max-w-md select-none">
        
      <span className="text-[12px] text-white/50 w-8 text-right">
        {formatTime(currentTime)}
      </span>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="w-full h-1 bg-zinc-700/60 rounded-lg appearance-none cursor-pointer accent-[#EF33E7] hover:accent-[#FF6BE7] transition-all"
      />

      <span className="text-[12px] text-white/50 w-8">
        {formatTime(duration)}
      </span>
    </div>
  );
}