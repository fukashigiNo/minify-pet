"use client"
import type { LucideIcon } from "lucide-react"

interface IIcon {
    icon: LucideIcon
    className?: string,
    color: string,
    fill?: string,
    size: number,
    handlePress?: () => void
}

export default function Icon({
    icon: IconComponent,
    className,
    color,
    fill,
    size,
    handlePress = () => {}
}: IIcon) {
    return (
        <div className={className} onClick={handlePress} >
                <IconComponent  color={color} size={size} fill={fill}/>
        </div>
    )
}