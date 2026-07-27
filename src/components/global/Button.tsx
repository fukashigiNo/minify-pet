"use client"

interface IButton {
    className: string,
    children: React.ReactNode,
    type?: "button" | "submit" | "reset",
    popovertarget?: any
    handlePress?: () => void
}

export default function Button ({
    className,
    children,
    type = "button",
    popovertarget,
    handlePress = () => {}
}: IButton)  {
  return (
        <button className={className} onClick={handlePress} type={type} popoverTarget={popovertarget}>
            {children}
        </button>
  )
}



