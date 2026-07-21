import { Heart } from "lucide-react"
import Button from "./Button"
import Icon from "./Icon"

interface IMusic {
    id: number,
    trackName: string,
    trackAuthor: string,
    trackLength: string,
    handlePress: () => void
}


export default function MusicCard({
    id,
    trackName,
    trackAuthor,
    trackLength,
    handlePress
}: IMusic) {
    return (
        <div className="flex justify-between mt-5 bg-[#110d1bff] p-4
                border-b border-zinc-500/50 rounded-t-[10px]  hover:bg-[#1d182bff]"
                onClick={() => handlePress()}
            >
                <div className="flex items-center gap-3">
                    <div>
                        <p>{id}</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-12 h-12 bg-radial-[at_25%_25%] from-[#FFFFFF]  to-[#EF33E7] to-75% rounded-[10px]" />
                        <div className="flex flex-col justify-center">
                            <p className="text-[15px] font-bold">{trackName}</p>
                            <p className="text-[12px] text-white/60">{trackAuthor}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Button className="cursor-pointer ">
                        <Icon icon={Heart} size={16} color="#EF33E7" />
                </Button>
                <p className="mt-4 text-[13px] text-white/60">{trackLength}</p>
            </div>
        </div>
    )
}