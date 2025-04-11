"use client"

import { useRef, useState } from "react"
import { ArrowDown, ArrowUp, Calendar, DollarSign, Filter, IndianRupee, Package, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Overview } from "@/components/overview"
import { RecentBookings } from "@/components/recent-booking"
import { BookingsByService } from "@/components/bookings-by-service"
import { UserActivityChart } from "@/components/user-activity-chart"
import { PaymentChart } from "@/components/payment-chart"
import { StatusDistribution } from "@/components/status-distribution"
import { ReservationModeChart } from "@/components/reservation-mode-char"
import {
    calculateMonthlyRevenue,
    getBookingStatusCounts,
    getReservationModeCounts,
    calculateMonthlyBookingTrend,
    getNewProducts,
    calculatePendingBookingChange,
    calculateMonthlyIncome,
    type Bookings,
} from "@/data"
import { api } from "@/trpc/react"


export default function AdminDashboard() {
    const [selectedTab, setSelectedTab] = useState("overview")

    const products = api.products.getProducts.useQuery();
    const bookings = api.booking.getBooking.useQuery({}, { enabled: true });

    const totalRevenue = calculateMonthlyIncome(bookings?.data || [])
    const monthlyRevenue = calculateMonthlyRevenue(bookings?.data || [])
    const statusCounts = getBookingStatusCounts(bookings?.data || [])
    const reservationModeCounts = getReservationModeCounts(bookings?.data || [])
    const monthlyComparision = calculateMonthlyBookingTrend(bookings?.data || []);
    const newProduct = getNewProducts(products?.data || [])
    const pendingBooking = calculatePendingBookingChange(bookings?.data || []);

    const reportRef = useRef<HTMLDivElement>(null);


    // console.log(monthlyComparision);

    const handleDownloadReport = async () => {


        if (!reportRef.current) return;

        const html2canvas = (await import("html2canvas")).default;
        const { jsPDF } = await import("jspdf");

        const canvas = await html2canvas(reportRef.current, {
            scale: 2,
        });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
        const imgWidth = canvasWidth * ratio;
        const imgHeight = canvasHeight * ratio;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        pdf.save("dashboard-report.pdf");
    };


    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8" ref={reportRef}>
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <div className="ml-auto flex items-center gap-2">
                        {/* <DatePickerWithRange className="hidden md:flex" />
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Filter className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Filter</span>
                        </Button> */}
                        <Button size="sm" className="h-8"
                            onClick={handleDownloadReport}
                        >
                            Download Report
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="space-y-4" onValueChange={setSelectedTab}>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalRevenue?.totalRevenue?.toFixed(2)}</div>
                                    <p className="text-xs text-muted-foreground flex gap-x-0 items-center " >
                                        {
                                            totalRevenue?.percentChange > 0 ?
                                                (
                                                    <>
                                                        <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
                                                        +{totalRevenue?.percentChange} % from last month
                                                    </>

                                                ) :
                                                (
                                                    <>
                                                        <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                                                        -{totalRevenue?.percentChange} % from last month
                                                    </>
                                                )
                                        }
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">New Bookings</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{(statusCounts?.PENDING ?? 0) + (statusCounts?.VIEWED ?? 0)}</div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        {
                                            monthlyComparision > 0
                                                ?
                                                (
                                                    <>
                                                        <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
                                                        {monthlyComparision}% from last month
                                                    </>
                                                )
                                                :
                                                (
                                                    <>
                                                        <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                                                        {monthlyComparision}% from last month
                                                    </>
                                                )
                                        }
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{products?.data?.length}</div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
                                        {newProduct} new Products
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{statusCounts.PENDING || 0}</div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                        <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                                        {pendingBooking} from yesterday
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Revenue Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <Overview data={monthlyRevenue} />
                                </CardContent>
                            </Card>

                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Booking Status</CardTitle>
                                    <CardDescription>Distribution of booking statuses</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <StatusDistribution data={statusCounts} />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Recent Bookings</CardTitle>
                                    <CardDescription>Latest booking activities</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentBookings data={(bookings?.data || []).slice(0, 5)} />
                                </CardContent>
                            </Card>

                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Reservation Methods</CardTitle>
                                    <CardDescription>How customers are making reservations</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ReservationModeChart data={reservationModeCounts} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Payment Analytics</CardTitle>
                                    <CardDescription>Monthly payment breakdown</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <PaymentChart data={monthlyRevenue} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>User Activity</CardTitle>
                                    <CardDescription>Active users over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <UserActivityChart />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Bookings by Service</CardTitle>
                                    <CardDescription>Most popular services</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <BookingsByService data={bookings?.data || []} />
                                </CardContent>
                            </Card>

                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>Revenue by Service</CardTitle>
                                    <CardDescription>Service contribution to revenue</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px]">
                                        {/* Revenue by service chart would go here */}
                                        <div className="flex h-full items-center justify-center text-muted-foreground">
                                            Chart showing revenue distribution by service
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="products" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Products (1-20) </CardTitle>
                                <CardDescription>Manage your products</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[450px] overflow-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2">Name</th>
                                                <th className="text-left p-2">Description</th>
                                                <th className="text-left p-2">Price</th>
                                                <th className="text-left p-2">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products?.data?.slice(0, 20)?.map((product) => (
                                                <tr key={product.id} className="border-b">
                                                    <td className="p-2">{product.name}</td>
                                                    <td className="p-2 max-w-[200px] truncate">{product.description}</td>
                                                    <td className="p-2">₹{product.price}</td>
                                                    <td className="p-2">{product.rating}/5</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="bookings" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Bookings (1-50) </CardTitle>
                                <CardDescription>Manage your bookings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[450px] overflow-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2">Service</th>
                                                <th className="text-left p-2">Customer</th>
                                                <th className="text-left p-2">Date</th>
                                                <th className="text-left p-2">Time</th>
                                                <th className="text-left p-2">Status</th>
                                                <th className="text-left p-2">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings?.data?.slice(0, 50)?.map((booking: Bookings) => (
                                                <tr key={booking.id} className="border-b">
                                                    <td className="p-2">{booking.serviceName || "N/A"}</td>
                                                    <td className="p-2">{booking.name}</td>
                                                    <td className="p-2">{booking.date}</td>
                                                    <td className="p-2">{booking.timeSlot}</td>
                                                    <td className="p-2">
                                                        <span
                                                            className={`inline-block px-2 py-1 rounded-full text-xs ${booking.status === "VIEWED"
                                                                ? "bg-green-100 text-green-800"
                                                                : booking.status === "PENDING"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : booking.status === "CANCELLED"
                                                                        ? "bg-red-100 text-red-800"
                                                                        : "bg-gray-100 text-gray-800"
                                                                }`}
                                                        >
                                                            {booking.status || "N/A"}
                                                        </span>
                                                    </td>
                                                    <td className="p-2">{booking.servicePrice || "Price on consultation"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
