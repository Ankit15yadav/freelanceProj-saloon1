"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

interface PaymentChartProps {
    data: {
        name: string
        total: number
    }[]
}

export function PaymentChart({ data }: PaymentChartProps) {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
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
                <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}
