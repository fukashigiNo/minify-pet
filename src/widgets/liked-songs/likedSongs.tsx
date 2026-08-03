"use client"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/components/store/hooks"
import { setCurrentTrack } from "@/components/store/slices"
import { MusicCard } from "@/components/global"
import { Heart } from "lucide-react"
import supabseClient from "@/utils/supabase/supabaseClient"
import getDeviseId from "@/utils/get-device-id/getDeviceId"

interface ITrack {
    id: number;
    trackName: string;
    trackAuthor: string;
    trackLength: string;
    src: string;
}

export default function LikedSongsPage() {
    const dispatch = useAppDispatch();
    const [likedTracks, setLikedTracks] = useState<ITrack[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLikes = async () => {
            const deviceId = getDeviseId();
            
            const { data, error } = await supabseClient
                .from('liked_songs')
                .select('tracks') 
                .eq('user_id', deviceId);

            if (data && !error) {
                const tracks = data.map(item => item.tracks);
                setLikedTracks(tracks);
            } else {
                console.error("Ошибка при загрузке лайков:", error);
            }
            
            setIsLoading(false);
        }

        fetchLikes();
    }, []);

    return (
        <div className="p-4 sm:p-6 md:p-8 w-full min-h-screen text-white bg-[#0a0710]">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 mb-8 text-center sm:text-left">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 shrink-0 bg-radial-[at_25%_25%] from-[#FF6BE7] to-[#EF33E7] to-75% rounded-[10px] shadow-[0_0_40px_rgba(255,107,231,0.3)] flex items-center justify-center">
                    <Heart size={40} className="sm:hidden" color="white" fill="white" />
                    <Heart size={64} className="hidden sm:block" color="white" fill="white" />
                </div>
                <div className="flex flex-col gap-1 sm:gap-2 items-center sm:items-start">
                    <p className="text-xs sm:text-sm font-semibold tracking-widest text-white/70">PLAYLIST</p>
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter">Liked Songs</h1>
                    <p className="text-white/60 text-sm">
                        {isLoading ? "Загрузка..." : `${likedTracks.length} tracks`}
                    </p>
                </div>
            </div>

            <div className="flex flex-col h-[70vh] sm:h-[500px] w-full overflow-y-auto scrollbar-custom mt-4 pr-1 sm:pr-2 gap-2 rounded-[16px]">
                {isLoading ? (
                    <div className="text-center mt-20 text-white/50">
                        <p>Ищем твои любимые треки...</p>
                    </div>
                ) : likedTracks.length > 0 ? (
                    likedTracks.map((track, index) => (
                        <MusicCard 
                            key={track.id}
                            id={track.id}
                            trackName={track.trackName}
                            trackAuthor={track.trackAuthor}
                            trackLength={track.trackLength}
                            src={track.src}
                            handlePress={() => {
                                dispatch(setCurrentTrack({
                                    track: track,
                                    playlist: likedTracks,
                                    index: index
                                }));
                            }}
                        />
                    ))
                ) : (
                    <div className="text-center mt-20 text-white/50">
                        <p>Здесь пока пусто.</p>
                        <p>Лайкни пару треков, чтобы они появились тут!</p>
                    </div>
                )}
            </div>
        </div>
    )
}