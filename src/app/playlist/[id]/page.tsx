import { Hero } from "@/widgets/hero"

interface IPlaylistHero {
    params: Promise<{id: string}>
}

const mockData1 = [
    {
        photo: "kjsdkfsdfx",
        id: 1,
        trackName: "Appolon",
        trackAuthor: "Tom Ruy",
        trackLength: "3:24"
    }, {
        photo: "kjsdkfsdfx",
        id: 2,
        trackName: "Cronos",
        trackAuthor: "Piro Go",
        trackLength: "3:24"
    }, {
        photo: "kjsdkfsdfx",
        id: 3,
        trackName: "Your luv",
        trackAuthor: "Lumen kai",
        trackLength: "3:24"
    }, 
]


const mockData2 = [
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

const mockData3= [
    {
        photo: "kjsdkfsdfx",
        id: 1,
        trackName: "Scream",
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

const mockData4 = [
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

export default async function PlaylistHero({params}: IPlaylistHero) {
    const {id} = await params

    if (id === "loser-club") return <Hero playlistId={id} playlistName="Loser club-" tracks={mockData1} sumTracks="3 tracks" />

    if(id === "wntr") return <Hero playlistId={id} playlistName="WNTR" tracks={mockData2} sumTracks="3 tracks" />

    if(id === "something-sad") return  <Hero playlistId={id} playlistName="Something sad" tracks={mockData3} sumTracks="3 tracks" />

    if(id === "vibe") return  <Hero playlistId={id} playlistName="VIBE" tracks={mockData4} sumTracks="3 tracks" />

}