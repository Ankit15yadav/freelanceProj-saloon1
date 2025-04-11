"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import type { Bookings } from "@/data"

interface BookingsByServiceProps {
    data: Bookings[]
}

const COLORS = ["#0088fe", "#00c49f", "#ff8042", "#8884d8", "#82ca9d", "#ffc658"]

export function BookingsByService({ data }: BookingsByServiceProps) {
    // Count bookings by service
    const serviceCount: Record<string, number> = {}

    data.forEach((booking) => {
        const serviceName = booking.serviceName || "Unspecified"
        serviceCount[serviceName] = (serviceCount[serviceName] || 0) + 1
    })

    const chartData = Object.entries(serviceCount).map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length],
    }))

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                        name.length > 10
                            ? `${name.substring(0, 10)}... ${(percent * 100).toFixed(0)}%`
                            : `${name} ${(percent * 100).toFixed(0)}%`
                    }
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <Card className="border shadow-sm">
                                    <CardContent className="p-2">
                                        <div className="text-sm font-bold">{payload[0]?.name}</div>
                                        <div className="text-sm font-semibold">Count: {payload[0]?.value}</div>
                                    </CardContent>
                                </Card>
                            )
                        }
                        return null
                    }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}
