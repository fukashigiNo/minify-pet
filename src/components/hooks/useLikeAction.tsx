"use client"
import { useOptimisticToggle } from "react-smart-action"
import supabseClient from "@/utils/supabase/supabaseClient"
import getDeviseId from "@/utils/get-device-id/getDeviceId"

// Типизируем объект, который будет лежать в JSONB
export interface ITrackData {
    id: number;
    trackName: string;
    trackAuthor: string;
    trackLength: string;
    src: string;
}

export const useLikeTrack = (track: ITrackData, initialLiked: boolean) => {
    const getDevice = getDeviseId()

    const [isLiked, toggleLike, meta] = useOptimisticToggle(
        initialLiked,
        async (nextState) => {
            if (nextState) {
                const { error } = await supabseClient
                    .from('liked_songs')
                    .insert([{ 
                        user_id: getDevice, 
                        track_id: track.id,
                        tracks: track
                    }])
                
                if (error) throw error
            } else {
                const { error } = await supabseClient
                    .from('liked_songs')
                    .delete()
                    .match({ user_id: getDevice, track_id: track.id })
                
                if (error) throw error
            }
        },
        {
            onError: (err) => {
                console.error("Не удалось сохранить лайк в БД:", err)
            }
        }
    )

    return { isLiked, toggleLike, meta }
}