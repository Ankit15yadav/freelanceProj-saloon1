"use client"
import { useState } from "react"
import type { NextPage } from "next"
import Image from "next/image"
import { motion } from "framer-motion"
import { Carousel } from "@/components/carousel"
import { BookingModal } from "@/components/booking-modal"
import { servicesData } from "../../../services-data"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight, Sparkles, Scissors, Smile, Shirt, ArrowRight } from "lucide-react"

type Gender = "men" | "women"
type ServiceCategory = string

const Home: NextPage = () => {
    const [selectedGender, setSelectedGender] = useState<Gender>("women")
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(servicesData[selectedGender][0]?.name || "")
    const [hoveredService, setHoveredService] = useState<number | null>(null)

    // Main service cards data
    const mainServices = [
        {
            title: "Hair Services",
            subtitle: "Professional haircuts and styling",
            image: "/services/service-1.svg",
            icon: <Scissors className="w-5 h-5 text-primary" />,
            bgColor: "bg-[#FFF5F5]",
            borderColor: "border-[#FFE5E5]"
        },
        {
            title: "Facial & Skin Care",
            subtitle: "Rejuvenating treatments for your skin",
            image: "/services/service-2.svg",
            icon: <Smile className="w-5 h-5 text-primary" />,
            bgColor: "bg-[#F5F9FF]",
            borderColor: "border-[#E5EDFF]"
        },
        {
            title: selectedGender === "men" ? "Beard Grooming" : "Threading & Waxing",
            subtitle: selectedGender === "men" ? "Expert beard styling and care" : "Precision threading and waxing services",
            image: "/services/service-3.svg",
            icon: <Shirt className="w-5 h-5 text-primary" />,
            bgColor: "bg-[#F5FFF7]",
            borderColor: "border-[#E5FFED]"
        },
    ]

    const handleBookNow = (serviceTitle: string) => {
        const category = servicesData[selectedGender].find(
            cat => cat.name.includes(serviceTitle.split(" ")[0] ?? "") || cat.name.includes(serviceTitle ?? "")
        );
        if (category) {
            setSelectedCategory(category.name)
            document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
        }
    }

    const selectedCategoryData = servicesData[selectedGender].find(category => category.name === selectedCategory)

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Hero Section */}
            <div className="w-full bg-gradient-to-r from-primary/5 via-white to-secondary/5 py-8">
                <div className="w-11/12 mx-auto px-4">
                    <Tabs defaultValue={selectedGender} className="w-full mb-6"
                        onValueChange={(value) => {
                            setSelectedGender(value as Gender)
                            setSelectedCategory(servicesData[value as Gender][0]?.name || "")
                        }}>
                        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-100 p-1 rounded-xl">
                            <TabsTrigger value="women" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Women
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="men" className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg">
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Men
                                </span>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Premium Salon Services
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Experience luxury grooming tailored for {selectedGender === "men" ? "gentlemen" : "ladies"}
                        </p>
                    </motion.div>

                    <Carousel
                        images={[
                            "/services/carosuel.svg",
                            "/services/carosuel.svg",
                            "/services/carosuel.svg",
                        ]}
                    />
                </div>
            </div>

            {/* Featured Services */}
            <div className="w-11/12 mx-auto px-4 py-12">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-2xl font-bold mb-8 text-center"
                >
                    Our Signature Services
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mainServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`${service.bgColor} ${service.borderColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border`}
                            onClick={() => handleBookNow(service.title)}
                            onMouseEnter={() => setHoveredService(index)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-white rounded-full shadow-sm">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold">{service.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-4">{service.subtitle}</p>
                            <motion.div
                                animate={{
                                    width: hoveredService === index ? '100%' : '0%',
                                    opacity: hoveredService === index ? 1 : 0
                                }}
                                className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* All Services Section */}
            <div className="w-full bg-gray-50 py-12" id="services">
                <div className="w-11/12 mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center">
                            {selectedGender === "men" ? "Men's" : "Women's"} Services
                        </h2>

                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {servicesData[selectedGender].map((category, index) => (
                                <motion.button
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.name
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                                        : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                                        }`}
                                >
                                    {category.name.split(". ")[1] || category.name}
                                </motion.button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {selectedCategoryData?.services.map((service, serviceIndex) => (
                                <motion.div
                                    key={serviceIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full"
                                >
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={`/services/service-${(serviceIndex % 6) + 1}.svg`}
                                            alt={service.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-lg">{service.name}</h3>
                                            {service.price && (
                                                <span className="font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                                                    {service.price}
                                                </span>
                                            )}
                                        </div>

                                        {"subServices" in service && service.subServices && service.subServices.length > 0 && (
                                            <div className="mb-4 space-y-2 flex-grow">
                                                {service.subServices.map((subService, subIndex) => (
                                                    <div key={subIndex} className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-0">
                                                        <span className="text-gray-700">{subService.name}</span>
                                                        <span className="text-primary font-medium whitespace-nowrap">{subService.price}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <BookingModal

                                            serviceName={service.name}
                                            price={service.price || "Price on consultation"}
                                            imageUrl={`/services/service-${(serviceIndex % 6) + 1}.svg`}
                                            buttonText="Book Now"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Button variant="outline" className="group flex items-center gap-2 px-6 py-3 rounded-full">
                                View All {selectedGender === "men" ? "Men's" : "Women's"} Services
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}

export default Home