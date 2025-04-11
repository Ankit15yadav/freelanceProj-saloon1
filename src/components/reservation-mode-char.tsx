"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

interface ReservationModeChartProps {
    data: Record<string, number>
}

const COLORS = ["#0088fe", "#00c49f", "#ff8042", "#8884d8"]

export function ReservationModeChart({ data }: ReservationModeChartProps) {
    // Normalize keys to lowercase and sum values for duplicates
    const unifiedData: Record<string, number> = {}

    Object.entries(data).forEach(([key, value]) => {
        const lowerKey = key.toLowerCase()
        if (unifiedData[lowerKey] === undefined) {
            unifiedData[lowerKey] = value
        } else {
            unifiedData[lowerKey] += value
        }
    })

    const chartData = Object.entries(unifiedData).map(([name, value], index) => ({
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
