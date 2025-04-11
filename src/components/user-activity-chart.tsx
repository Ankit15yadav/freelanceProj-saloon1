"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

const data = [
    { name: "Jan", users: 10 },
    { name: "Feb", users: 20 },
    { name: "Mar", users: 15 },
    { name: "Apr", users: 25 },
    { name: "May", users: 30 },
    { name: "Jun", users: 40 },
    { name: "Jul", users: 35 },
    { name: "Aug", users: 45 },
    { name: "Sep", users: 50 },
    { name: "Oct", users: 55 },
    { name: "Nov", users: 60 },
    { name: "Dec", users: 65 },
]

export function UserActivityChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <Card className="border shadow-sm">
                                    <CardContent className="p-2">
                                        <div className="text-sm font-bold">{payload[0]?.payload.name}</div>
                                        <div className="text-sm font-semibold">Users: {payload[0]?.value}</div>
                                    </CardContent>
                                </Card>
                            )
                        }
                        return null
                    }}
                />
                <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fill="hsl(var(--primary)/0.2)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}
