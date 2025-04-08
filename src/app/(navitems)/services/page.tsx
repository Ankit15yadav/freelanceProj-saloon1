"use client"
import { useState } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import { Carousel } from "@/components/carousel"
import { ServiceCard } from "@/components/service-card"
import { BookingModal } from "@/components/booking-modal"
import { servicesData } from "../../../services-data"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

type Gender = "men" | "women"
type ServiceCategory = string

const Home: NextPage = () => {
    const [selectedGender, setSelectedGender] = useState<Gender>("women")
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(servicesData[selectedGender][0]?.name || "")

    // Main service cards data
    const mainServices: Array<{
        title: string
        subtitle: string
        image: string
        imagePosition: "left" | "right"
    }> = [
            {
                title: "Hair Services",
                subtitle: "Professional haircuts and styling",
                image: "/services/service-1.svg",
                imagePosition: "left",
            },
            {
                title: "Facial & Skin Care",
                subtitle: "Rejuvenating treatments for your skin",
                image: "/services/service-2.svg",
                imagePosition: "right",
            },
            {
                title: selectedGender === "men" ? "Beard Grooming" : "Threading & Waxing",
                subtitle: selectedGender === "men" ? "Expert beard styling and care" : "Precision threading and waxing services",
                image: "/services/service-3.svg",
                imagePosition: "left",
            },
        ]

    const handleBookNow = (serviceTitle: string) => {
        // Find the matching category in the services data
        const category = servicesData[selectedGender].find(
            (cat) => cat.name.includes(serviceTitle.split(" ")[0] ?? "") || cat.name.includes(serviceTitle ?? ""),
        )

        if (category) {
            setSelectedCategory(category.name)
            const serviceSection = document.getElementById("services")
            if (serviceSection) {
                serviceSection.scrollIntoView({ behavior: "smooth" })
            }
        }
    }

    // Get the selected category data
    const selectedCategoryData = servicesData[selectedGender].find((category) => category.name === selectedCategory)

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <div className="w-11/12 mx-auto px-4 py-6">
                {/* Gender Selection Tabs */}
                <Tabs
                    defaultValue={selectedGender}
                    className="w-full mb-6"
                    onValueChange={(value) => {
                        setSelectedGender(value as Gender)
                        setSelectedCategory(servicesData[value as Gender][0]?.name || "")
                    }}
                >
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                        <TabsTrigger value="women">Women</TabsTrigger>
                        <TabsTrigger value="men">Men</TabsTrigger>
                    </TabsList>
                </Tabs>

                {/* Main Carousel */}
                <Carousel
                    images={[
                        "/services/carosuel.svg",
                        "/services/carosuel.svg",
                        "/services/carosuel.svg",
                        "/services/carosuel.svg",
                    ]}
                />

                {/* Service Cards */}
                <div className="mt-8 space-y-4">
                    {mainServices.map((service, index) => (
                        <ServiceCard
                            key={index}
                            title={service.title}
                            subtitle={service.subtitle}
                            image={service.image}
                            imagePosition={service.imagePosition}
                            onBookNow={() => handleBookNow(service.title)}
                        />
                    ))}
                </div>

                {/* Service Categories */}
                <div className="mt-8" id="services">
                    <h2 className="text-xl font-bold mb-4">{selectedGender === "men" ? "Men's" : "Women's"} Services</h2>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {servicesData[selectedGender].map((category, index) => (
                            <Button
                                key={index}
                                variant={selectedCategory === category.name ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category.name)}
                                className="text-sm"
                            >
                                {category.name.split(". ")[1] || category.name}
                            </Button>
                        ))}
                    </div>

                    {/* Services for the selected category */}
                    <div className="space-y-4">
                        {selectedCategoryData?.services.map((service, serviceIndex) => (
                            <div key={serviceIndex} className="border rounded-lg p-4 bg-white">
                                <div className="flex items-center gap-4">
                                    <div className="shrink-0">
                                        <Image
                                            src={`/services/service-${(serviceIndex % 6) + 1}.svg`}
                                            alt={service.name}
                                            width={150}
                                            height={150}
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center gap-y-3 items-start flex-1">
                                        <div className="flex justify-between w-full">
                                            <h3 className="font-bold text-lg">{service.name}</h3>
                                            {service.price && <span className="font-semibold text-primary">{service.price}</span>}
                                        </div>

                                        {/* Sub-services if available */}
                                        {"subServices" in service && service.subServices && service.subServices.length > 0 && (
                                            <div className="w-full space-y-2 mt-2">
                                                {service.subServices.map((subService, subIndex) => (
                                                    <div key={subIndex} className="flex justify-between items-center text-sm border-b pb-2">
                                                        <span>{subService.name}</span>
                                                        <span className="text-primary">{subService.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <BookingModal
                                            serviceName={service.name}
                                            price={service.price || "Price on consultation"}
                                            imageUrl={`/services/service-${(serviceIndex % 6) + 1}.svg`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View All Services Button */}
                <div className="mt-8 flex justify-center">
                    <Button variant="outline" className="flex items-center gap-2">
                        View All {selectedGender === "men" ? "Men's" : "Women's"} Services
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default Home
