"use client"
import { Icon, Button, MusicCard } from "@/components/global"
import { Heart, Search } from "lucide-react"
import { useAppDispatch } from "@/components/store/hooks"
import { setCurrentTrack } from "@/components/store/slices"

interface IHero {
    playlistId: string
    playlistName: string
    sumTracks: string
    tracks: {
        photo: string,
        id: number,
        trackName: string,
        trackAuthor: string
        trackLength: string
        src: string;
    }[],
}



export default function Hero ({playlistId, playlistName, sumTracks, tracks}: IHero) {
    const dispatch = useAppDispatch()
  return (
    <div 
        className="flex flex-col items-center justify-center p-10 w-[80%] mx-auto" 
        id={playlistId}
    >
        <div className="w-[60%] flex justify-between items-center mb-3">
            <p className="text-white text-2xl font-bold tracking-tight">{playlistName}</p>
            <p className="text-[12px]">{sumTracks}</p>
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
            {tracks.map((item, index) => (
                <MusicCard 
                key={item.id} 
                id={item.id}  
                trackName={item.trackName} trackAuthor={item.trackAuthor} 
                trackLength={item.trackLength}
                handlePress={() => dispatch(setCurrentTrack({
                track: item,
                playlist: tracks,
                index: index
            }))}
                />
            ))}
        </div>
    </div>
  )
}
