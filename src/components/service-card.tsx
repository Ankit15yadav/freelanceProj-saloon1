'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const RotatedImage = () => {

    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        // Set initial window width
        setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0)

        // Update window width when resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="col-span-1 sm:col-span-1 md:col-span-2 flex flex-col items-center order-1 sm:order-2">
            <div className="flex items-center justify-center">
                <Image
                    src="/assets/img2.svg"
                    alt="Salon service"
                    width={windowWidth < 640 ? 120 : windowWidth < 768 ? 150 : 200}
                    height={windowWidth < 640 ? 120 : windowWidth < 768 ? 150 : 200}
                    className="object-contain"
                />
            </div>
            <div className="flex items-center justify-center gap-x-2 sm:gap-x-4 -mt-2 sm:-mt-4 md:-mt-8">
                <Image
                    src="/assets/img1.svg"
                    alt="Salon service"
                    width={windowWidth < 640 ? 120 : windowWidth < 768 ? 150 : 200}
                    height={windowWidth < 640 ? 120 : windowWidth < 768 ? 150 : 200}
                    className="object-contain"
                />
                <Image
                    src="/assets/img3.svg"
                    alt="Salon service"
                    width={windowWidth < 640 ? 120 : windowWidth < 768 ? 150 : 200}
                    height={windowWidth < 640 ? 120 : windowWidth < 768 ? 150 : 200}
                    className="object-contain"
                />
            </div>
        </div>
    )
}

export default RotatedImage