import type { $Enums } from "@prisma/client"

export interface Product {
    id: string
    name: string
    description: string
    price: string
    rating: string
    image: string
    createdAt: Date | null
}

export type Bookings = {
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


export function calculateMonthlyIncome(bookings: Bookings[]): { totalRevenue: number, percentChange: number } {
    let currentMonthRevenue = 0;
    let previousMonthRevenue = 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Determine the previous month & its year (to handle January -> December transition)
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    bookings.forEach((booking) => {
        // We consider only completed bookings
        if (booking.status === 'COMPLETED') {
            const price = booking.servicePrice?.trim();

            // Ignore if price doesn't exist or indicates a consultation (non-numeric)
            if (price && price !== 'Price on consultation') {
                // Remove any non-numeric characters (e.g. the rupee sign "₹")
                const numericPrice = price.replace(/[^\d]/g, '');

                if (numericPrice) {
                    const parsedPrice = parseInt(numericPrice, 10);
                    const bookingDate = new Date(booking.createdAt);
                    const bookingMonth = bookingDate.getMonth();
                    const bookingYear = bookingDate.getFullYear();

                    // Add the price to the respective month's revenue
                    if (bookingMonth === currentMonth && bookingYear === currentYear) {
                        currentMonthRevenue += parsedPrice;
                    } else if (bookingMonth === previousMonth && bookingYear === previousMonthYear) {
                        previousMonthRevenue += parsedPrice;
                    }
                }
            }
        }
    });

    // Calculate the percent change from previous month to current month
    // If previous month revenue is 0, we decide on what makes sense:
    // here, if any revenue exists for current month, we treat it as 100% increase,
    // otherwise the change is 0.
    let percentChange = 0;
    if (previousMonthRevenue === 0) {
        percentChange = currentMonthRevenue > 0 ? 100 : 0;
    } else {
        percentChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
    }

    return {
        totalRevenue: currentMonthRevenue,
        percentChange: Math.round(percentChange) // rounding to a whole number percentage
    };
}





// Calculate monthly revenue
export function calculateMonthlyRevenue(bookings: Bookings[]): { name: string; total: number }[] {
    const monthlyRevenue: { [key: string]: number } = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
    };

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    bookings.forEach((booking) => {
        // Only consider completed bookings
        if (booking.status !== 'COMPLETED') return;

        if (booking.servicePrice) {
            const price = booking.servicePrice.trim();

            // Ignore non-numeric labels, for example "Price on consultation"
            if (price === "Price on consultation") return;

            // Remove all non-digit characters (e.g., removes the rupee sign)
            const numericPrice = price.replace(/[^\d]/g, '');
            if (!numericPrice) return;

            const parsedPrice = parseInt(numericPrice, 10);
            const bookingDate = new Date(booking.createdAt);
            const monthName = monthNames[bookingDate.getMonth()];
            monthlyRevenue[monthName!]! += parsedPrice;
        }
    });

    return Object.entries(monthlyRevenue).map(([name, total]) => ({ name, total }));
}


export function getBookingStatusCounts(bookings: Bookings[]): Record<string, number> {
    const statusCounts: Record<string, number> = {
        PENDING: 0,
        COMPLETED: 0,
        CANCELLED: 0,
        UNKNOWN: 0
    }

    bookings.forEach((booking) => {
        if (booking.status) {
            statusCounts[booking.status] = (statusCounts[booking.status] || 0) + 1
        } else {
            statusCounts.UNKNOWN = (statusCounts.UNKNOWN || 0) + 1
        }
    })

    return statusCounts
}


export function getReservationModeCounts(bookings: Bookings[]): Record<string, number> {
    const modeCounts: Record<string, number> = {}

    bookings.forEach((booking) => {
        modeCounts[booking.modeOfReservation] = (modeCounts[booking.modeOfReservation] || 0) + 1
    })

    return modeCounts
}


export function calculateMonthlyBookingTrend(bookings: Bookings[]): number {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    let currentMonthCount = 0
    let previousMonthCount = 0

    bookings.forEach((booking) => {
        const bookingDate = new Date(booking.createdAt)
        const month = bookingDate.getMonth()
        const year = bookingDate.getFullYear()

        if (month === currentMonth && year === currentYear) {
            currentMonthCount++
        } else if (month === previousMonth && year === previousMonthYear) {
            previousMonthCount++
        }
    })

    if (previousMonthCount === 0) {
        return currentMonthCount === 0 ? 0 : 100 // avoid division by zero
    }

    const change = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100

    return Math.round(change)
}

function isCreatedWithinTwoDays(isoDateString: string): boolean {
    const createdDate = new Date(isoDateString)

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const created = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate())

    return created.getTime() === today.getTime() || created.getTime() === yesterday.getTime()
}


export function getNewProducts(product: Product[]): number {

    let count = 0;

    product.forEach((product) => {

        if (isCreatedWithinTwoDays(`${product?.createdAt}`)) {
            count++;
        }
    })

    return count;
}

export function calculatePendingBookingChange(bookings: Bookings[]): number {
    const now = new Date()

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    let todayCount = 0
    let yesterdayCount = 0

    bookings.forEach((booking) => {
        if (booking.status !== 'PENDING') return

        const createdAt = new Date(booking.createdAt)
        const createdDate = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate())

        if (createdDate.getTime() === today.getTime()) {
            todayCount++
        } else if (createdDate.getTime() === yesterday.getTime()) {
            yesterdayCount++
        }
    })

    if (yesterdayCount === 0) {
        return todayCount === 0 ? 0 : 100
    }

    const change = ((todayCount - yesterdayCount) / yesterdayCount) * 100
    return Math.round(change)
}
