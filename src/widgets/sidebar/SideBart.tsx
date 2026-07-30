"use client"
import { Button, Icon } from "@/components/global"
import Link from "next/link";
import { Heart, Music2, Menu, X } from "lucide-react"
import { useState } from "react"

const mockData = [
    { id: "loser-club", name: "Loser club-" },
    { id: "wntr", name: "WNTR" },
    { id: "something-sad", name: "Something sad" },
    { id: "vibe", name: "VIBE?" }
];
export default function SideBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <>
            {/* мобильная кнопка вызова меню */}
            <Button
                className="md:hidden fixed top-3 left-3 z-50 p-2 bg-black/80 border border-zinc-500/50 rounded-[10px] cursor-pointer"
                handlePress={() => setIsOpen(true)}
            >
                <Icon icon={Menu} size={20} color="white" />
            </Button>

            {/* затемнение фона на мобильных при открытой панели */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`w-72 h-screen bg-black p-4 border-r border-zinc-500/50
                fixed md:static top-0 left-0 z-50
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex items-center justify-between md:justify-start">
                    <Button className="flex flex-row gap-4 items-center cursor-pointer p-2">
                        <p className="text-[18px] text-black font-extrabold bg-radial-[at_25%_25%] from-[#FF6BE7]  to-[#EF33E7] to-75%
                             w-8 h-8 flex  justify-center items-center rounded-full">M</p>
                        <p className="text-xl font-bold tracking-tighter text-white">minify</p>
                    </Button>

                    {/* кнопка закрытия только на мобильных */}
                    <Button
                        className="md:hidden cursor-pointer p-2"
                        handlePress={() => setIsOpen(false)}
                    >
                        <Icon icon={X} size={20} color="white" />
                    </Button>
                </div>
                <div className="mt-8">
                    <p className="text-[13px] text-gray-300/65 tracking-wide font-semibold p-2">PLAYLISTS</p>
                    <div className="mt-1">
                        <Link 
                            className="flex flex-row items-center w-full mb-1 gap-4
                                        rounded-[10px] cursor-pointer p-2 text-[14px] text-white/70
                                        hover:bg-gray-900 hover:text-white focus:bg-gray-800 focus:text-white"
                            href={`/playlist/liked-songs`}
                            onClick={() => setIsOpen(false)}
                            >
                            <Icon icon={Heart} color="#FF6BE7" fill="#FF6BE7" size={16} />
                            Liked Songs
                        </Link>
                        {mockData.map((item, index) => (
                            <Link className="flex flex-row items-center w-full gap-4 
                                            cursor-pointer rounded-[10px] mb-1 p-2 text-[14px] text-white/70
                                            hover:bg-gray-900 hover:text-white focus:text-white focus:bg-gray-800"
                             key={index}
                             href={`/playlist/${item.id}`}
                             onClick={() => setIsOpen(false)}
                             >
                                <Icon icon={Music2} size={16} color="#ffffffad" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}