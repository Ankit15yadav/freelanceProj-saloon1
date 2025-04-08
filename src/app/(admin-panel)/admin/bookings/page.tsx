'use client'
import { api } from '@/trpc/react';
import React from 'react';
import useLocalStorage from 'use-local-storage';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    CalendarDays,
    Clock,
    Phone,
    Ticket,
    User,
    ArrowRight,
    CheckCircle2,
    BadgeCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

type Bookings = {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    phoneNumber: string;
    date: Date;
    timeSlot: string;
    modeOfReservation: string;
    coupon: string | null;
}

const BookingCard = ({ booking }: { booking: Bookings }) => {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card className="relative group overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                    <div className="flex items-center space-x-3">
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
                    <Badge variant="outline" className="rounded-full px-3 py-1 bg-blue-50/50 border-blue-200">
                        <CheckCircle2 className="h-4 w-4 mr-1.5 text-blue-600" />
                        {booking.modeOfReservation}
                    </Badge>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <CalendarDays className="h-4 w-4" />
                                Booking Date
                            </div>
                            <div className="font-medium">
                                {formatDate(booking.date)}
                            </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 mx-4" />
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                Time Slot
                            </div>
                            <div className="font-medium">
                                {booking.timeSlot}
                            </div>
                        </div>
                    </div>

                    {booking.coupon && (
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                            <div className="flex items-center gap-2">
                                <Ticket className="h-5 w-5 text-green-600" />
                                <span className="text-sm font-medium text-green-700">
                                    Applied Coupon: {booking.coupon}
                                </span>
                            </div>
                            <BadgeCheck className="h-5 w-5 text-green-600" />
                        </div>
                    )}

                </CardContent>

                <CardFooter className="flex items-center justify-between border-t pt-4">
                    <div className="text-sm text-gray-500">
                        Created {formatDate(booking.createdAt)}
                    </div>
                    <Button
                        variant="default"
                        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => console.log('Confirming:', booking.id)}
                    >
                        <span className="relative z-10">Confirm Booking</span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

const BookingPage = () => {
    const [userId] = useLocalStorage<string | null>('userId', null);
    const { data: bookings, isLoading } = api.booking.getBooking.useQuery(
        { userId: userId! },
        { enabled: !!userId }
    );

    return (
        <div className="min-h-screen bg-gray-50/50  px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Your Bookings</h1>
                    <p className="text-gray-600 text-sm">Manage and track your upcoming bookings</p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings?.map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                        ))}
                    </div>
                )}

                {!isLoading && bookings?.length === 0 && (
                    <div className="text-center py-12 space-y-4">
                        <div className="mx-auto h-24 w-24 text-gray-400" />
                        <p className="text-gray-600">No upcoming bookings found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;