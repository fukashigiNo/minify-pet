"use client"
import { Icon, Button, MusicCard } from "@/components/global"
import { Heart, Search } from "lucide-react"

const mockData = [
    {
        photo: "kjsdkfsdfx",
        id: 1,
        trackName: "Midnight bloom",
        trackAuthor: "Nova Rea",
        trackLength: "3:24"
    }, {
        photo: "kjsdkfsdfx",
        id: 2,
        trackName: "Amber",
        trackAuthor: "Sol Vega",
        trackLength: "3:24"
    }, {
        photo: "kjsdkfsdfx",
        id: 3,
        trackName: "Paper Skies",
        trackAuthor: "Lumen",
        trackLength: "3:24"
    }, 
]

export default function Hero () {
  return (
    <div className="flex flex-col items-center justify-center p-10 w-[80%] mx-auto" >
        <div className="w-[60%] flex justify-between items-center mb-3">
            <p className="text-white text-2xl font-bold tracking-tight">Loser club-</p>
            <p className="text-[12px]">12 tracks</p>
        </div>
        <div className="flex items-center p-1 px-4 bg-[#110d1bff] w-[60%] border border-slate-600 rounded-full">
            <Icon icon={Search} size={18} color="white"/>
            <input 
            type="text"
            placeholder="Search artists or tracks" 
            className= " px-2 py-1 w-full bg-transparent outline-none border-none focus:outline-none focus:ring-0" 
            />
        </div>
        <div className="flex-1 overflow-y-auto pb-32 w-[60%] h-40 ">
            {mockData.map((item) => (
                <MusicCard 
                key={item.id} 
                id={item.id}  
                trackName={item.trackName} trackAuthor={item.trackAuthor} 
                trackLength={item.trackLength}/>
            ))}
        </div>
    </div>
  )
}
