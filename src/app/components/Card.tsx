// components/ui/card.tsx
import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
