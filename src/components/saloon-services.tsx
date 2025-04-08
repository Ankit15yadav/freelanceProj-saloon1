"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { servicesData } from "../services-data"
import {
    Scissors,
    Paintbrush,
    HandMetal,
    Sparkles,
    Smile,
    Brush,
    Flower,
    Waves,
    Leaf,
    Heart,
    Gem,
} from "lucide-react"

export default function SalonServices() {
    const [activeTab, setActiveTab] = useState<"men" | "women">("men")

    const getCategoryIcon = (categoryName: string) => {
        const iconProps = { className: "w-5 h-5" }

        if (categoryName.includes("Hair Services") || categoryName.includes("Haircut")) return <Scissors {...iconProps} />
        if (categoryName.includes("Hair Color") || categoryName.includes("Coloring")) return <Paintbrush {...iconProps} />
        if (categoryName.includes("Beard")) return <HandMetal {...iconProps} />
        if (categoryName.includes("Hand") || categoryName.includes("Manicure")) return <HandMetal {...iconProps} />
        if (categoryName.includes("Treatment")) return <Sparkles {...iconProps} />
        if (categoryName.includes("Facial") || categoryName.includes("Skin")) return <Smile {...iconProps} />
        if (categoryName.includes("Threading")) return <Brush {...iconProps} />
        if (categoryName.includes("Extensions")) return <Waves {...iconProps} />
        if (categoryName.includes("Spa")) return <Flower {...iconProps} />
        if (categoryName.includes("Scalp")) return <Leaf {...iconProps} />

        return categoryName.includes("Men") ? <Gem {...iconProps} /> : <Heart {...iconProps} />
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f9f9f9] to-[#f0f5f2]">
            <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-block p-2 px-6 rounded-full bg-gradient-to-r from-[#A2D485]/20 to-[#E5ABAB]/20 mb-4">
                        <span className="text-sm font-medium bg-gradient-to-r from-[#7ebb62] to-[#d98b8b] bg-clip-text text-transparent">
                            Premium Beauty & Grooming
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-[#7ebb62] via-[#b8a3c8] to-[#d98b8b] bg-clip-text text-transparent">
                        Luxury Salon Services
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                        Discover our premium grooming services tailored for both men and women, designed to enhance your natural
                        beauty and style.
                    </p>
                </div>

                <Tabs
                    defaultValue="men"
                    className="w-full"
                    onValueChange={(value) => setActiveTab(value as "men" | "women")}
                >
                    <div className="flex justify-center mb-8 sm:mb-10">
                        <TabsList className="grid w-full max-w-xs sm:max-w-md grid-cols-2 p-1 rounded-full bg-white shadow-md border border-gray-100">
                            <TabsTrigger
                                value="men"
                                className="rounded-full py-2 sm:py-3 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#A2D485] data-[state=active]:to-[#8fc772] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                            >
                                <span className="flex items-center gap-1 sm:gap-2 font-medium">
                                    <Gem className="w-3 h-3 sm:w-4 sm:h-4" /> Men
                                </span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="women"
                                className="rounded-full py-2 sm:py-3 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#E5ABAB] data-[state=active]:to-[#d99595] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                            >
                                <span className="flex items-center gap-1 sm:gap-2 font-medium">
                                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" /> Women
                                </span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="w-full">
                        <TabsContent value="men" className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-300">
                            {servicesData.men.map((category) => (
                                <ServiceCategory
                                    key={category.name}
                                    category={category}
                                    gender="men"
                                    getCategoryIcon={getCategoryIcon}
                                />
                            ))}
                        </TabsContent>

                        <TabsContent value="women" className="space-y-6 sm:space-y-8 animate-in fade-in-50 duration-300">
                            {servicesData.women.map((category) => (
                                <ServiceCategory
                                    key={category.name}
                                    category={category}
                                    gender="women"
                                    getCategoryIcon={getCategoryIcon}
                                />
                            ))}
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

interface ServiceCategoryProps {
    category: {
        name: string
        services: Array<{
            name: string
            description?: string
            price: string | null
            subServices?: Array<{
                name: string
                description?: string
                price: string | null
            }>
        }>
    }
    gender: "men" | "women"
    getCategoryIcon: (categoryName: string) => React.ReactNode
}

function ServiceCategory({ category, gender, getCategoryIcon }: ServiceCategoryProps) {
    const categoryName = category.name.replace(/^\d+\.\s+/, "")
    const icon = getCategoryIcon(category.name)

    const bgGradient = "bg-gradient-to-br from-white to-[#f8faf6]"
    const accentGradient =
        gender === "men"
            ? "bg-gradient-to-r from-[#A2D485] to-[#b8d4a3]"
            : "bg-gradient-to-r from-[#E5ABAB] to-[#e8c1c1]"

    const textGradient =
        gender === "men"
            ? "bg-gradient-to-r from-[#5c8f41] to-[#7ba364] bg-clip-text text-transparent"
            : "bg-gradient-to-r from-[#c27878] to-[#c99393] bg-clip-text text-transparent"

    const badgeGradient =
        gender === "men"
            ? "bg-gradient-to-r from-[#A2D485] to-[#b8d4a3]"
            : "bg-gradient-to-r from-[#E5ABAB] to-[#e8c1c1]"

    return (
        <Card className={`overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300 ${bgGradient}`}>
            <div className="h-1 w-full bg-gradient-to-r from-[#A2D485] via-[#c8c4d8] to-[#E5ABAB]" />
            <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className={`${accentGradient} text-white p-2 rounded-lg`}>{icon}</div>
                    <h2 className={`text-lg sm:text-xl font-bold ${textGradient}`}>{categoryName}</h2>
                </div>

                <div className="grid gap-4 sm:gap-6">
                    {category.services.map((service, index) => (
                        <div
                            key={index}
                            className="group border-b border-gray-100 pb-4 sm:pb-5 last:border-b-0 last:pb-0 hover:bg-white/80 p-3 rounded-lg transition-colors duration-200"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-1 sm:mb-2">
                                <h3 className="font-medium text-gray-800 text-sm sm:text-base">{service.name}</h3>
                                {service.price && (
                                    <Badge
                                        className={`${badgeGradient} text-white font-medium px-3 py-1 text-xs sm:text-sm min-w-[80px] sm:min-w-[100px] text-center`}
                                    >
                                        {service.price}
                                    </Badge>
                                )}
                            </div>

                            {service.description && (
                                <p className="text-gray-600 text-xs sm:text-sm mt-1">{service.description}</p>
                            )}

                            {service.subServices && (
                                <div className="mt-3 sm:mt-4 pl-3 sm:pl-4 grid gap-2 sm:gap-3">
                                    {service.subServices.map((subService, subIndex) => (
                                        <div
                                            key={subIndex}
                                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm bg-white p-2 sm:p-3 rounded-md shadow-sm border-l-2 border-[#c8c4d8]"
                                        >
                                            <span className="text-gray-700">{subService.name}</span>
                                            <span
                                                className={`font-medium ${subService.price ?
                                                    (gender === "men" ? "text-[#5c8f41]" : "text-[#c27878]") :
                                                    "text-gray-500"}`}
                                            >
                                                {subService.price || "Price on consultation"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}