"use client"

interface IButton {
    className: string,
    children: React.ReactNode,
    type?: "button" | "submit" | "reset",
    handlePress?: () => void
}

export default function Button ({
    className,
    children,
    type = "button",
    handlePress = () => {}
}: IButton)  {
  return (
        <button className={className} onClick={handlePress} type={type}>
            {children}
        </button>
  )
}



