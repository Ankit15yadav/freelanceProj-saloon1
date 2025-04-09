"use client"
import { api } from "@/trpc/react"
import React, { useState } from "react"
import useLocalStorage from "use-local-storage"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    CalendarDays,
    Clock,
    Phone,
    Ticket,
    ArrowRight,
    CheckCircle2,
    BadgeCheck,
    TimerIcon,
    ClipboardList,
    CheckCheck,
} from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import type { $Enums } from "@prisma/client"
import { toast } from "sonner"
import useRefetch from "@/hooks/use-refetch"

type Bookings = {
    serviceName: string | null
    date: string
    timeSlot: string
    modeOfReservation: string
    name: string
    id: string
    createdAt: Date
    updatedAt: Date
    status: $Enums.Status | null
    coupon: string | null
    phoneNumber: string
    servicePrice: string | null
}

const BookingCard = ({ booking, userId }: { booking: Bookings; userId: string }) => {
    const refetch = useRefetch()

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    const updateBooking = api.booking.updateBooking.useMutation()

    const handleConfirm = async (BookingId: string) => {
        await updateBooking.mutateAsync(
            { groupdId: BookingId },
            {
                onSuccess: () => {
                    refetch()
                    toast.success("Status updated successfully")
                },
            },
        )
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className="relative group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                    <div className="flex items-center justify-between space-x-3">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${booking.name}`} />
                            <AvatarFallback>{booking.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-semibold">{booking.name}</h3>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {booking.phoneNumber}
                            </p>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-y-1.5">
                        <Badge variant="outline" className="rounded-full px-3 py-1 bg-blue-50/50 border-blue-200">
                            <CheckCircle2 className="h-4 w-4 mr-1.5 text-blue-600" />
                            {booking.modeOfReservation}
                        </Badge>
                        {booking.status === "PENDING" ? (
                            <Badge variant={"outline"} className="rounded-full px-3 py-1 bg-red-100/20 border-red-200">
                                <TimerIcon className="h-4 w-fit" />
                                {booking.status}
                            </Badge>
                        ) : (
                            <Badge variant={"outline"} className="rounded-full px-3 py-1 bg-green-200/20 border-green-200">
                                <CheckCircle2 className="h-4 w-fit" />
                                {booking.status}
                            </Badge>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <CalendarDays className="h-4 w-4" />
                                Booking Date
                            </div>
                            <div className="font-medium">{booking.date}</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 mx-4" />
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                Time Slot
                            </div>
                            <div className="font-medium">{booking.timeSlot}</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Ticket className="h-4 w-4" />
                                Service Name
                            </div>
                            <div className="font-medium">{booking.serviceName ?? "Not specified"}</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 mx-4" />
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <BadgeCheck className="h-4 w-4" />
                                Service Price
                            </div>
                            <div className="font-medium">{booking.servicePrice ?? "Not specified"}</div>
                        </div>
                    </div>
                    {booking.coupon && (
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center gap-2">
                                <Ticket className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-700">Applied Coupon: {booking.coupon}</span>
                            </div>
                            <BadgeCheck className="h-5 w-5 text-green-600" />
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t pt-4">
                    <div className="text-sm text-gray-500">Created {formatDate(booking.createdAt)}</div>
                    <Button
                        variant="secondary"
                        className="relative overflow-hidden bg-[#A2D485]"
                        onClick={() => handleConfirm(booking?.id)}
                        disabled={booking.status === "VIEWED"}
                    >
                        <span className="relative z-10">
                            {booking.status === "PENDING" ? "Confirm Booking" : "Booking confirmed"}
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

const BookingPage = () => {
    const [userId] = useLocalStorage<string | null>("userId", null)
    const [activeTab, setActiveTab] = useState<"pending" | "viewed">("pending")

    const { data: bookings, isPending } = api.booking.getBooking.useQuery({ userId: userId! }, { enabled: !!userId })

    // Filter bookings based on status
    const filteredBookings = React.useMemo(() => {
        if (!bookings) return []

        if (activeTab === "pending") {
            return bookings.filter((booking) => booking.status === "PENDING")
        } else {
            // For viewed bookings, only show those from the last 2 days
            const twoDaysAgo = new Date()
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

            return bookings.filter((booking) => booking.status === "VIEWED" && new Date(booking.createdAt) >= twoDaysAgo)
        }
    }, [bookings, activeTab])

    if (isPending) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50/50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Your Bookings</h1>
                    <p className="text-gray-600 text-sm">Manage and track your upcoming bookings</p>
                </div>

                <Tabs
                    defaultValue="pending"
                    className="mb-6"
                    onValueChange={(value) => setActiveTab(value as "pending" | "viewed")}
                >
                    <TabsList className="grid w-full max-w-md grid-cols-2 mb-4">
                        <TabsTrigger value="pending" className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4" />
                            Pending
                            {(bookings ?? []).filter((b) => b.status === "PENDING").length > 0 && (
                                <Badge variant="secondary" className="ml-1 bg-red-100 text-red-700">
                                    {bookings?.filter((b) => b.status === "PENDING").length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="viewed" className="flex items-center gap-2">
                            <CheckCheck className="h-4 w-4" />
                            Viewed
                            {(bookings ?? [])?.filter((b) => b.status === "VIEWED")?.length > 0 && (
                                <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
                                    {
                                        bookings?.filter(
                                            (b) =>
                                                b.status === "VIEWED" &&
                                                new Date(b.createdAt) >= new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                                        ).length
                                    }
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pending" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} userId={userId!} />
                            ))}

                            {filteredBookings.length === 0 && (
                                <div className="col-span-full text-center py-12 space-y-4">
                                    <div className="mx-auto h-24 w-24 text-gray-400" />
                                    <p className="text-gray-600">No pending bookings found</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="viewed" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} userId={userId!} />
                            ))}

                            {filteredBookings.length === 0 && (
                                <div className="col-span-full text-center py-12 space-y-4">
                                    <div className="mx-auto h-24 w-24 text-gray-400" />
                                    <p className="text-gray-600">No viewed bookings from the last 2 days</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default BookingPage
