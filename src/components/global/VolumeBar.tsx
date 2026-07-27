interface IVolume {
    volume: number
    handleVolumeChange: (newVolume: number) => void
}

export default function VolumeBar ({
    volume,
    handleVolumeChange
}: IVolume) {
    return (
       <div 
            className="absolute bottom-full mb-3 flex items-center gap-3 p-3 bg-[#181326] border border-zinc-700/60 rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <input 
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-24 h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-[#EF33E7]"
            />

            <span className="text-[11px] font-semibold text-white/80 select-none min-w-[32px] text-right">
                {Math.round(volume * 100)}%
            </span>
        </div>
    )
}