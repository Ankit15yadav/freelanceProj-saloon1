'use client'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
    // Function to get time-based greeting

    const router = useRouter();

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) {
            return "Good morning";
        } else if (hour < 18) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {getGreeting()}, Admin!
                </h1>
                <p className="text-xl text-gray-600">
                    Welcome to your Dashboard
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <Button
                    onClick={() => router.push("/admin/bookings")}
                    className="bg-[#3f85377e] hover:bg-[#81a87c7e] hover:cursor-pointer text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300">
                    Bookings
                </Button>
                <Button
                    onClick={() => router.push("/admin/product")}
                    className="bg-[#2ca61e7e] hover:bg-[#81a87c7e] hover:cursor-pointer text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300">
                    Product
                </Button>
                <Button
                    onClick={() => router.push("/admin/blogs")}
                    className="bg-[#3f85377e] hover:bg-[#81a87c7e] hover:cursor-pointer text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300">
                    Blogs
                </Button>
            </div>
        </div>
    )
}

export default Dashboard