"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface SalonLoaderProps {
    size?: number
    color?: string
    speed?: "slow" | "normal" | "fast"
    className?: string
}

export default function SalonLoader({ size = 48, color = "#333333", speed = "normal", className }: SalonLoaderProps) {
    const [encodedSVG, setEncodedSVG] = useState<string>("")

    // Animation speed multiplier
    const speedMultiplier = {
        slow: 1.5,
        normal: 1,
        fast: 0.7,
    }

    useEffect(() => {
        // Create the SVG dynamically with the specified color
        const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 6 6"
            to="360 6 6"
            dur="${2 * speedMultiplier[speed]}s"
            repeatCount="indefinite"
          />
        </circle>
        <line x1="6" y1="9" x2="6" y2="12">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 6 6"
            to="360 6 6"
            dur="${2 * speedMultiplier[speed]}s"
            repeatCount="indefinite"
          />
        </line>
        <path d="M8 9L18 19">
          <animate
            attributeName="stroke-dasharray"
            values="0,30;30,0"
            dur="${1.5 * speedMultiplier[speed]}s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M18 9L8 19">
          <animate
            attributeName="stroke-dasharray"
            values="0,30;30,0"
            dur="${1.5 * speedMultiplier[speed]}s"
            repeatCount="indefinite"
          />
        </path>
        <circle cx="18" cy="6" r="3">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 6"
            to="360 18 6"
            dur="${2 * speedMultiplier[speed]}s"
            repeatCount="indefinite"
          />
        </circle>
        <line x1="18" y1="9" x2="18" y2="12">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 6"
            to="360 18 6"
            dur="${2 * speedMultiplier[speed]}s"
            repeatCount="indefinite"
          />
        </line>
      </svg>
    `

        // Encode the SVG for use in an image src
        const encoded = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`
        setEncodedSVG(encoded)
    }, [color, size, speed])

    return (
        <div className={cn("relative flex items-center justify-center", className)}>
            {encodedSVG && (
                <Image
                    src={encodedSVG || "/placeholder.svg"}
                    width={size}
                    height={size}
                    alt="Loading..."
                    unoptimized
                    className="animate-pulse"
                />
            )}
        </div>
    )
}
