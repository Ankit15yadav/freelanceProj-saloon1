"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

interface OverviewProps {
    data: {
        name: string
        total: number
    }[]
}

export function Overview({ data }: OverviewProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <Card className="border shadow-sm">
                                    <CardContent className="p-2">
                                        <div className="text-sm font-bold">{payload[0]?.payload.name}</div>
                                        <div className="text-sm font-semibold text-primary">${payload[0]?.value?.toString()}</div>
                                    </CardContent>
                                </Card>
                            )
                        }
                        return null
                    }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="fill-primary" />
            </BarChart>
        </ResponsiveContainer>
    )
}
