import { Hero } from "@/widgets/hero"
import { supabaseClient } from "@/utils/supabase"

interface IPlaylistHero {
    params: Promise<{id: string}>
}

export default async function PlaylistHero({params}: IPlaylistHero) {
    const {id} = await params

    const {data: Playlist , error} =await supabaseClient
            .from("playlist")
            .select("*")
            .eq("playlist_id", id)
            .single()

    if(error || !Playlist) {
        return (
        <div className="flex flex-col items-center justify-center w-full">
            <p className="text-4xl text-white">404</p>
            <p className="text-xl text-white">Playlist not found</p>
        </div>
    )
    }

return (
    <Hero
        playlistId={id}
        playlistName={Playlist.name}
        tracks={Playlist.tracks}
        sumTracks={"3 tracks"}
    />
    )

}