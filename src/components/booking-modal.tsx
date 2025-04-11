'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import { toast } from 'sonner'

interface BookingModalProps {
    serviceName: string
    price: string
    imageUrl: string
    buttonText?: string
}

type BookingFormState = {
    name: string
    contactNumber: string
    date: string
    timeSlot: string
    modeOfReservation: string
    loyaltyCoupon: string
}

export function BookingModal({
    serviceName,
    price,
    imageUrl,
    buttonText = 'Book Now',
}: BookingModalProps) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [open, setOpen] = useState<boolean>(false);
    const [form, setForm] = useState<BookingFormState>({
        name: '',
        contactNumber: '',
        date: '',
        timeSlot: '',
        modeOfReservation: '',
        loyaltyCoupon: '',
    })
    const createBooking = api.booking.insertBooking.useMutation();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange =
        (field: keyof BookingFormState) => (value: string) => {
            setForm((prev) => ({ ...prev, [field]: value }))
        }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const bookingData = {
            serviceName,
            price,
            imageUrl,
            ...form,
        }
        console.log('Booking Confirmed:', bookingData)
        // TODO: Add submission logic (API or toast)

        await createBooking.mutateAsync({
            coupon: form.loyaltyCoupon,
            name: form.name,
            date: form.date,
            modeOfReservation: form.modeOfReservation,
            phone: form.contactNumber,
            timeSlot: form.timeSlot,
            service: bookingData.serviceName,
            price: bookingData.price
        }, {
            onSuccess: () => {
                toast.success("Booking Created Successfully");
                setOpen(false);
            }
        })

    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-muted text-sm">
                    {buttonText}
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[95vw] md:max-w-2xl lg:max-w-4xl p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl sm:text-2xl font-semibold">
                        Book {serviceName}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left: Image Preview */}
                        <div className="relative w-full h-64 lg:h-full rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src={imageUrl || '/placeholder.svg'}
                                alt={serviceName}
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => setIsFavorite((prev) => !prev)}
                                className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full p-2 shadow"
                            >
                                <Heart
                                    className={cn('w-5 h-5 transition-colors', {
                                        'fill-red-500 text-red-500': isFavorite,
                                        'text-muted-foreground': !isFavorite,
                                    })}
                                />
                            </button>
                        </div>

                        {/* Right: Form */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">{serviceName}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-primary">${price}</span>
                                    <span className="text-muted-foreground text-sm">before taxes</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    name="name"
                                    placeholder="Full Name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Input
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    value={form.contactNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Input
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={handleInputChange}
                                    required
                                />

                                <Select
                                    value={form.timeSlot}
                                    onValueChange={handleSelectChange('timeSlot')}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select time slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM', '5:00 PM - 7:00 PM'].map(
                                            (slot) => (
                                                <SelectItem key={slot} value={slot}>
                                                    {slot}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={form.modeOfReservation}
                                    onValueChange={handleSelectChange('modeOfReservation')}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Reservation Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['Online', 'Phone', 'In-Person'].map((mode) => (
                                            <SelectItem key={mode} value={mode}>
                                                {mode}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={form.loyaltyCoupon}
                                    onValueChange={handleSelectChange('loyaltyCoupon')}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Apply Coupon (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['None', '10% Off', 'Free Add-on'].map((coupon) => (
                                            <SelectItem key={coupon} value={coupon}>
                                                {coupon}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end pt-2">
                        <Button type="submit" className="w-full md:w-auto"
                            disabled={createBooking.isPending}
                        >
                            {
                                createBooking.isPending ?
                                    ("Booking..") :
                                    ("Confirm Booking")
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
