"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Bookings } from "@/data"

interface RecentBookingsProps {
    data: Bookings[]
}

export function RecentBookings({ data }: RecentBookingsProps) {
    return (
        <div className="space-y-8">
            {data.map((booking) => (
                <div key={booking.id} className="flex items-center">
                    <Avatar className="h-9 w-9 mr-4">
                        <AvatarFallback>{booking.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{booking.name}</p>
                        <p className="text-sm text-muted-foreground">
                            {booking.serviceName || "Service consultation"} • {booking.date}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">
                        {booking.servicePrice && booking.servicePrice.match(/^\d+$/)
                            ? `$${booking.servicePrice}`
                            : booking.servicePrice || "Price on consultation"}
                    </div>
                </div>
            ))}
        </div>
    )
}
