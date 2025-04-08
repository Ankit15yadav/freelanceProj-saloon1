"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {
    Carousel as ShadcnCarousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"

interface CarouselProps {
    images: string[]
}

export function Carousel({ images }: CarouselProps) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const handleDotClick = (index: number) => {
        api?.scrollTo(index)
    }

    return (
        <div className="relative w-full mx-auto">
            <ShadcnCarousel setApi={setApi} className="w-full rounded-2xl overflow-hidden">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="relative aspect-[3/1] w-full">
                                <Image
                                    src={image || "/placeholder.svg"}
                                    alt={`Carousel image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden" />
                <CarouselNext className="hidden" />
            </ShadcnCarousel>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-5 h-5 rounded-full transition-colors ${current === index ? "bg-primary" : "bg-gray-300"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

