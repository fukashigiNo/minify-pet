"use client"
import { Button, Icon } from "@/components/global"
import { Heart, Music2,  } from "lucide-react"

const mockData = [
    "Loser club-",  "WNTR", "Somethind sad", "VIBE?"
]

export default function SideBar() {
    return (
        <div className="w-72 h-screen bg-black p-4 border-r border-zinc-500/50">
            <Button className="flex flex-row gap-4 items-center cursor-pointer p-2">
                <p className="text-[18px] text-black font-extrabold bg-[#EF33E7] 
                     w-8 h-8 flex  justify-center items-center rounded-full">M</p>
                <p className="text-xl font-bold tracking-tighter">minify</p>
            </Button>
            <div className="mt-8">
                <p className="text-[13px] text-gray-300/65 tracking-wide font-semibold p-2">PLAYLISTS</p>
                <div className="mt-1">
                    <Button className="flex flex-row items-center w-full mb-1 gap-4
                                    rounded-[10px] cursor-pointer p-2 text-[14px] text-white/70
                                    hover:bg-gray-900 hover:text-white focus:bg-gray-800 focus:text-white">
                        <Icon icon={Heart} color="#FF6BE7" size={16} />
                        Liked Songs
                    </Button>
                    {mockData.map((item, index) => (
                        <Button className="flex flex-row items-center w-full gap-4 
                                        cursor-pointer rounded-[10px] mb-1 p-2 text-[14px] text-white/70
                                        hover:bg-gray-900 hover:text-white focus:text-white focus:bg-gray-800"
                         key={index}>
                            <Icon icon={Music2} size={16} color="#ffffffad" />
                            {item}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}