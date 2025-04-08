"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BookingModalProps {
    serviceName: string
    price: string
    imageUrl: string
    buttonText?: string
}

export function BookingModal({ serviceName, price, imageUrl, buttonText = "Book Now" }: BookingModalProps) {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-200 hover:bg-gray-100 text-black">
                    {buttonText}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[900px] p-0 overflow-hidden">
                {/* 1. Add a header with a title (and optional description) */}
                <DialogHeader>
                    <DialogTitle className="flex text-center items-center justify-center mt-2 font-bold text-2xl" > Booking</DialogTitle>
                    {/* <DialogDescription>Fill in your details to reserve your spot.</DialogDescription> */}
                </DialogHeader>

                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full md:w-1/2 h-[250px] md:h-auto">
                        <Image
                            src={imageUrl || "/placeholder.svg?height=600&width=400"}
                            alt={serviceName}
                            fill
                            className="object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                        />
                        <button
                            className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full"
                            onClick={() => setIsFavorite(!isFavorite)}
                        >
                            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
                        </button>
                    </div>

                    {/* Form Section */}
                    <div className="w-full md:w-1/2 p-4 md:p-6 space-y-4">
                        <h2 className="text-xl md:text-2xl font-semibold">{serviceName}</h2>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-800 px-2 py-0.5 text-xs rounded">Special Offer</span>
                        </div>
                        <div className="flex items-baseline">
                            <span className="text-sm">$</span>
                            <span className="text-3xl md:text-4xl font-bold">{price}</span>
                        </div>
                        <p className="text-gray-500 text-sm">Select your booking details</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: "Name", options: ["John Doe", "Jane Smith"] },
                                { label: "Contact Number", options: ["+1 (123) 456-7890", "+1 (456) 789-0123"] },
                                { label: "Date", options: ["Today", "Tomorrow", "Next Week"] },
                                { label: "Time-Slot", options: ["9:00 AM - 11:00 AM", "1:00 PM - 3:00 PM", "5:00 PM - 7:00 PM"] },
                                { label: "Mode of Reservation", options: ["Online", "Phone", "In-Person"] },
                                { label: "Loyalty Coupon", options: ["None", "10% Off", "Free Add-on"] }
                            ].map(({ label, options }, index) => (
                                <div key={index} className="space-y-2">
                                    <label className="text-sm font-medium">{label}</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {options.map((option, i) => (
                                                <SelectItem key={i} value={option.toLowerCase().replace(/ /g, "-")}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Optionally add a footer for your action button */}
                <DialogFooter>
                    <Button className="w-full sm:w-auto">{buttonText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

