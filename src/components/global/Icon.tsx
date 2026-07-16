"use client"
import type { LucideIcon } from "lucide-react"

interface IIcon {
    icon: LucideIcon
    className?: string,
    color: string,
    size: number,
    handlePress?: () => void
}

export default function Icon({
    icon: IconComponent,
    className,
    color,
    size,
    handlePress = () => {}
}: IIcon) {
    return (
        <div className={className} onClick={handlePress} >
                <IconComponent  color={color} size={size} />
        </div>
    )
}