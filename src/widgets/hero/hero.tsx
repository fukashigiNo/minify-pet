"use client"
import { Icon, Button, MusicCard } from "@/components/global"
import { Heart, Search } from "lucide-react"
import { useAppDispatch } from "@/components/store/hooks"
import { setCurrentTrack } from "@/components/store/slices"
import { useState } from "react"


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
    const [query, setQuery] = useState("")
    const dispatch = useAppDispatch()

    const filteredTracks = tracks.filter((track) => {
        const querytrack =  query.toLowerCase()
        return(
            track.trackName.toLowerCase().includes(querytrack) ||
            track.trackAuthor.toLowerCase().includes(querytrack)
        )
    })

    
  return (
    <div 
        className="flex flex-col items-center justify-start p-4 sm:p-6 md:p-10 w-full sm:w-[90%] md:w-[80%] mx-auto" 
        id={playlistId}
    >
        <div className="w-full sm:w-[85%] md:w-[70%] lg:w-[60%] flex justify-between items-center mb-3 text-white gap-2">
            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight truncate">{playlistName}</p>
            <p className="text-[11px] sm:text-[12px] text-white/60 shrink-0">{sumTracks}</p>
        </div>
        <div className="flex items-center p-1 px-3 sm:px-4 bg-[#110d1bff] w-full sm:w-[85%] md:w-[70%] lg:w-[60%] border border-slate-600 rounded-full">
            <Icon icon={Search} size={18} color="white"/>
            <input 
            type="text"
            placeholder="Search artists or tracks" 
            className= " px-2 py-1 w-full bg-transparent outline-none border-none focus:outline-none text-white focus:ring-0 text-sm sm:text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
        </div>
      
        <div className="w-full h-[90vh] sm:h-auto sm:w-[85%] md:w-[70%] lg:w-[60%] max-h-[90vh] sm:max-h-[450px] md:max-h-[500px] overflow-y-auto scrollbar-custom mt-4 pr-1 sm:pr-2 flex flex-col gap-2 rounded-[16px]">
            {filteredTracks.length === 0 && (
                <p className="text-center text-white/50 mt-10">Nothing found for "{query}"</p>
            )}
            {filteredTracks.map((item) => {
                const originalIndex = tracks.findIndex(t => t.id === item.id)

                return (
                    <MusicCard 
                        key={item.id} 
                        id={item.id}  
                        src={item.src}
                        trackName={item.trackName} 
                        trackAuthor={item.trackAuthor} 
                        trackLength={item.trackLength}
                        handlePress={() => dispatch(setCurrentTrack({
                            track: item,
                            playlist: tracks, 
                            index: originalIndex
                        }))}
                    />
                )
            })}
        </div>
    </div>
  )
}