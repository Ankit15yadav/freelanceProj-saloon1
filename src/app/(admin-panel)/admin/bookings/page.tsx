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

    const handleConfirm = async (BookingId: string, status: string) => {
        await updateBooking.mutateAsync(
            {
                groupdId: BookingId,
                status: status
            },
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
            <Card
                className={`relative group overflow-hidden border-0 shadow-xl transition-all duration-300 ${booking.status === "PENDING"
                    ? "bg-gradient-to-br from-white to-yellow-50"
                    : booking.status === "VIEWED"
                        ? "bg-gradient-to-br from-white to-blue-50"
                        : booking.status === "COMPLETED"
                            ? "bg-gradient-to-br from-white to-green-50"
                            : "bg-gradient-to-br from-white to-red-50"
                    }`}
            >
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
                            <Badge variant={"outline"} className="rounded-full px-3 py-1 bg-yellow-100/20 border-yellow-200">
                                <TimerIcon className="h-4 w-fit mr-1 text-yellow-600" />
                                {booking.status}
                            </Badge>
                        ) : booking.status === "VIEWED" ? (
                            <Badge variant={"outline"} className="rounded-full px-3 py-1 bg-blue-100/20 border-blue-200">
                                <CheckCircle2 className="h-4 w-fit mr-1 text-blue-600" />
                                {booking.status}
                            </Badge>
                        ) : booking.status === "COMPLETED" ? (
                            <Badge variant={"outline"} className="rounded-full px-3 py-1 bg-green-100/20 border-green-200">
                                <CheckCircle2 className="h-4 w-fit mr-1 text-green-600" />
                                {booking.status}
                            </Badge>
                        ) : (
                            <Badge variant={"outline"} className="rounded-full px-3 py-1 bg-red-100/20 border-red-200">
                                <CheckCircle2 className="h-4 w-fit mr-1 text-red-600" />
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
                    {booking.status === "VIEWED" ? (
                        <div className="flex gap-2">
                            <Button
                                variant="secondary"
                                className="relative overflow-hidden bg-green-500 text-white hover:bg-green-600"
                                onClick={() => {
                                    console.log(handleConfirm(booking.id, 'COMPLETED'))
                                    // You'll handle the backend call later
                                }}
                            >
                                <span className="relative z-10">Confirm</span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                            </Button>
                            <Button
                                variant="secondary"
                                className="relative overflow-hidden bg-red-500 text-white hover:bg-red-600"
                                onClick={() => {
                                    console.log(handleConfirm(booking.id, 'CANCELLED'))
                                    // You'll handle the backend call later
                                }}
                            >
                                <span className="relative z-10">Cancel</span>
                                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="secondary"
                            className={`relative overflow-hidden ${booking.status === "COMPLETED"
                                ? "bg-green-500 text-white"
                                : booking.status === "CANCELLED"
                                    ? "bg-red-500 text-white"
                                    : "bg-[#A2D485]"
                                }`}
                            onClick={() => handleConfirm(booking?.id, 'VIEWED')}
                            disabled={booking.status !== "PENDING"}
                        >
                            <span className="relative z-10 cursor-pointer ">
                                {booking.status === "PENDING"
                                    ? "Mark Viewed"
                                    : booking.status === "COMPLETED"
                                        ? "Booking Completed"
                                        : booking.status === "CANCELLED"
                                            ? "Booking Cancelled"
                                            : "Booking Confirmed"}
                            </span>
                            <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    )
}

const BookingPage = () => {
    const [userId] = useLocalStorage<string | null>("userId", null)
    const [activeTab, setActiveTab] = useState<"pending" | "viewed" | "completed" | "cancelled">("pending")

    const { data: bookings, isPending } = api.booking.getBooking.useQuery({ userId: userId! }, { enabled: !!userId })

    // Filter bookings based on status
    const filteredBookings = React.useMemo(() => {
        if (!bookings) return []

        if (activeTab === "pending") {
            return bookings.filter((booking) => booking.status === "PENDING")
        } else if (activeTab === "viewed") {
            // For viewed bookings, only show those from the last 2 days
            const twoDaysAgo = new Date()
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
            return bookings.filter((booking) => booking.status === "VIEWED" && new Date(booking.createdAt) >= twoDaysAgo)
        } else if (activeTab === "completed") {
            return bookings.filter((booking) => booking.status === "COMPLETED")
        } else {
            return bookings.filter((booking) => booking.status === "CANCELLED")
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
                    onValueChange={(value) => setActiveTab(value as "pending" | "viewed" | "completed" | "cancelled")}
                >
                    <TabsList className=" w-full flex justify-center items-center max-w-md  mb-4">
                        <TabsTrigger value="pending" className="flex items-center gap-2">
                            <ClipboardList className="h-4 w-4" />
                            Pending
                            {(bookings ?? []).filter((b) => b.status === "PENDING").length > 0 && (
                                <Badge variant="secondary" className="ml-1 bg-yellow-100 text-yellow-700">
                                    {bookings?.filter((b) => b.status === "PENDING").length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="viewed" className="flex items-center ">
                            <CheckCheck className="h-4 w-4" />
                            Viewed
                            {(bookings ?? [])?.filter((b) => b.status === "VIEWED")?.length > 0 && (
                                <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
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
                        <TabsTrigger value="completed" className="flex items-center gap-2">
                            <CheckCheck className="h-4 w-4" />
                            Completed
                            {(bookings ?? [])?.filter((b) => b.status === "COMPLETED")?.length > 0 && (
                                <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
                                    {bookings?.filter((b) => b.status === "COMPLETED").length}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="cancelled" className="flex items-center gap-2">
                            <CheckCheck className="h-4 w-4" />
                            Cancelled
                            {(bookings ?? [])?.filter((b) => b.status === "CANCELLED")?.length > 0 && (
                                <Badge variant="secondary" className="ml-1 bg-red-100 text-red-700">
                                    {bookings?.filter((b) => b.status === "CANCELLED").length}
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
                    <TabsContent value="completed" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} userId={userId!} />
                            ))}

                            {filteredBookings.length === 0 && (
                                <div className="col-span-full text-center py-12 space-y-4">
                                    <div className="mx-auto h-24 w-24 text-gray-400" />
                                    <p className="text-gray-600">No completed bookings found</p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="cancelled" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBookings.map((booking) => (
                                <BookingCard key={booking.id} booking={booking} userId={userId!} />
                            ))}

                            {filteredBookings.length === 0 && (
                                <div className="col-span-full text-center py-12 space-y-4">
                                    <div className="mx-auto h-24 w-24 text-gray-400" />
                                    <p className="text-gray-600">No cancelled bookings found</p>
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
