'use client'
import Image from "next/image"
import { ArrowRight, Check, Trophy } from "lucide-react"
import Link from "next/link"
import { Jockey_One } from "next/font/google"
import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import BestSellerCard from "@/components/Best-seller-card"
import RotatedImage from "@/components/rotate-image"

const jockeyOne = Jockey_One({
    weight: '400',
    subsets: ['latin']
})

const section2Item = [
    {
        id: 1,
        icon: '/assets/hair-cut-tool1.svg'
    },
    {
        id: 2,
        icon: '/assets/hair-color.svg'
    },
    {
        id: 3,
        icon: '/assets/face-mask.svg'
    },
    {
        id: 4,
        icon: '/assets/manicure.svg'
    },
    {
        id: 5,
        icon: '/assets/hair-dryer.svg'
    },
]

const bestSellerItem = [
    {
        id: 1,
        title: '50% Off on',
        price: '$35',
        off: '$50',
        rating: '4.3',
        reviews: '250',
        image: '/assets/cream1.svg'
    },
    {
        id: 2,
        title: 'Matte Foundation Dry Skin',
        price: '$40',
        off: '$50',
        rating: '4.8',
        reviews: '102',
        image: '/assets/cream2.svg'
    },
    {
        id: 3,
        title: 'Primer Moisturizing Cream',
        price: '$84',
        off: '$120',
        rating: '4.6',
        reviews: '500',
        image: '/assets/cream3.svg'
    },
]

const TravelDetails = [
    {
        id: 1,
        title: 'Free Shipping',
        desc: 'On Order Above $200',
        icon: '/assets/truck.svg'
    },
    {
        id: 2,
        title: 'Easy Returns',
        desc: '15-Day Return Policy',
        icon: '/assets/return.svg'
    },
    {
        id: 3,
        title: '100% Authentic',
        desc: 'Product Sourced Directly',
        icon: '/assets/like.svg'
    },
]

export default function Home() {
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        // Set initial window width
        setWindowWidth(typeof window !== 'undefined' ? window.innerWidth : 0)

        // Update window width when resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <main className="min-h-screen overflow-hidden">
            {/* Hero Section */}
            <div className="container bg-[url('/diagonal-pattern.svg')] w-full sm:w-11/12 mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 items-center">
                    {/* Text Content */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-6 col-span-1 sm:col-span-1 md:col-span-3 order-2 sm:order-1 mt-6 sm:mt-0">
                        <h1 className={`${jockeyOne.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-tight`}>
                            Juhu's Premier Salon
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 max-w-fit">
                            Trusted by 1,00,000+ clients for top-tier beauty and grooming services.
                            With 20+ years of experience, we redefine beauty with precision and care.
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/booking"
                                className="inline-block shadow-xl px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-medium rounded-xl border-2 border-[#A2D485] text-black transition-colors hover:bg-[#A2D485] hover:text-white"
                            >
                                Book Your Slot
                            </Link>
                        </div>
                    </div>

                    {/* Images */}
                    <RotatedImage />
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 flex flex-col sm:flex-row justify-between items-center w-full sm:w-10/12 md:w-9/12 lg:w-8/12 mx-auto">
                    {/* Google Reviews */}
                    <div className="w-full flex justify-center md:flex sm:w-auto mb-6 sm:mb-0">
                        <Image
                            src="/assets/google.svg"
                            alt="Google reviews"
                            width={windowWidth < 640 ? 150 : windowWidth < 768 ? 250 : 400}
                            height={windowWidth < 640 ? 40 : windowWidth < 768 ? 60 : 100}
                            className="object-contain"
                        />
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
                        {/* Years of Experience */}
                        <div className="text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start mb-1">
                                <div className="bg-green-500 text-white p-1 rounded mr-2">
                                    <Check size={16} />
                                </div>
                                <span className="font-bold text-xl sm:text-2xl text-gray-800">20+</span>
                            </div>
                            <span className="text-sm sm:text-base text-gray-700">Years of Expertise</span>
                        </div>

                        {/* Happy Clients */}
                        <div className="text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start mb-1">
                                <div className="text-yellow-500 mr-2">
                                    <Trophy size={20} />
                                </div>
                                <span className="font-bold text-xl sm:text-2xl text-gray-800">1 Lakh+</span>
                            </div>
                            <span className="text-sm sm:text-base text-gray-700">Happy Clients</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <section className="pt-4 bg-[#F6F0F0]">
                <div className="w-full sm:w-11/12 mx-auto px-4 sm:px-0">
                    <div className="flex gap-x-2 sm:gap-x-4 h-3 justify-end p-2 items-baseline">
                        <Label htmlFor="switch" className="text-lg sm:text-xl md:text-2xl font-thin">
                            Gender
                        </Label>
                        <Switch id="switch" />
                    </div>

                    {/* Services Icons */}
                    <div className="flex flex-wrap justify-center sm:justify-between mt-5 items-center gap-4 sm:gap-2 md:gap-4">
                        {section2Item.map((item) => (
                            <div
                                key={item.id}
                                className="w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] lg:w-[214px] lg:h-[214px] flex items-center justify-center rounded-full border bg-white border-b shadow-lg sm:shadow-xl shadow-gray-500/50"
                            >
                                <Image
                                    src={item.icon}
                                    alt="service icon"
                                    width={windowWidth < 640 ? 70 : windowWidth < 768 ? 80 : 100}
                                    height={windowWidth < 640 ? 70 : windowWidth < 768 ? 80 : 100}
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Best Seller Section */}
                    <div className="mt-12 sm:mt-16 md:mt-20 px-2 sm:px-0">
                        <div className="flex flex-col sm:flex-row py-3 items-center justify-between mx-auto gap-4 sm:gap-0">
                            <span className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center sm:text-left">
                                Best Sellers
                            </span>
                            <Button className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-[#FEFEF6] border border-[#ED474A] hover:bg-[#FEFEE9] text-gray-700 text-sm sm:text-base">
                                View All products
                            </Button>
                        </div>
                        <div className="flex flex-wrap flex-col justify-center sm:flex-row md:justify-between items-center gap-6 sm:gap-4 pt-6 sm:pt-8">
                            {bestSellerItem.map((item) => (
                                <div key={item.id} className="w-full  sm:w-auto">
                                    <BestSellerCard
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        off={item.off}
                                        rating={item.rating}
                                        reviews={item.reviews}
                                        image={item.image}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Banner Section */}
            <section className="pt-16 sm:pt-24 lg:pt-32 bg-[#F6F0F0]">
                <div className="w-full sm:w-11/12 mx-auto px-4 sm:px-0">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 items-center lg:items-end">
                        {/* Pink Banner */}
                        <div className="relative w-full lg:w-[750px] h-auto sm:h-[300px] md:h-[350px] lg:h-[387px] bg-[#E5ABAB] rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col gap-y-3 md:gap-y-4">
                            {/* Decorative Elements - Hidden on mobile */}
                            <Image
                                src="/assets/leaf1.svg"
                                alt="Decorative Leaf Top Right"
                                width={80}
                                height={80}
                                className="absolute top-0 right-4 sm:right-10 hidden sm:block"
                            />
                            <Image
                                src="/assets/leaf2.svg"
                                alt="Decorative Leaf Bottom Right"
                                width={80}
                                height={80}
                                className="absolute bottom-0 right-20 sm:right-52 hidden sm:block"
                            />

                            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold max-w-xl text-[#2F2D2A]">
                                Experience the Next Level of Beauty & Grooming
                            </p>
                            <span className="text-xs sm:text-sm font-semibold text-white max-w-sm">
                                We're redefining beauty with high-end services at budget-friendly prices. Glow like never before!
                            </span>
                            <div className="flex gap-x-2 items-baseline">
                                <Button className="mt-2 w-[120px] h-[40px] sm:w-[150px] sm:h-[50px] md:w-[177px] md:h-[59px] bg-white rounded-full text-gray-700 hover:bg-gray-200 text-sm sm:text-base">
                                    Book Your Slot
                                </Button>
                                <Button className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] md:h-[59px] md:w-[59px] rounded-full">
                                    <ArrowRight className="-rotate-45 bg-transparent text-pink-200" />
                                </Button>
                            </div>
                        </div>

                        {/* Person Image */}
                        <div className="relative overflow-visible w-full lg:w-auto flex justify-center lg:justify-start">
                            <div className="w-full max-w-md lg:max-w-none">
                                <Image
                                    src="/assets/human1.svg"
                                    alt="Person image"
                                    width={600}
                                    height={1000}
                                    className="block object-contain lg:-ml-24 w-full h-auto"
                                />
                                <div className="h-4 sm:h-6 md:h-8 w-full rounded-full bg-[#E5ABAB]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges Section */}
            <section className="pt-8 sm:pt-12 md:pt-16 bg-[#F6F0F0]">
                <div className="w-full sm:w-11/12 mx-auto px-4 sm:px-0">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 md:gap-4 items-center justify-between">
                        {TravelDetails.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-x-2 w-full sm:w-[240px] md:w-[270px] lg:w-[295px] items-center justify-center bg-white p-3 rounded-lg shadow-xl"
                            >
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={item.icon}
                                        alt="icon"
                                        width={40}
                                        height={40}
                                        className="w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px]"
                                    />
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    <span className="text-gray-700 font-semibold text-sm sm:text-base">{item.title}</span>
                                    <span className="text-xs sm:text-sm text-gray-500">{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Appointment Section */}
            <section className="pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10 bg-[#F6F0F0]">
                <div className="w-full sm:w-11/12 mx-auto px-4 sm:px-0">
                    <div className="w-full">
                        <Image
                            src="/assets/appointment.svg"
                            alt="appointment"
                            width={2000}
                            height={1}
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="flex flex-col gap-y-3 pt-6 sm:pt-8 md:pt-10 items-center justify-center text-center">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold px-2">
                            Premium Salon Services at Affordable Prices
                        </p>
                        <p className="flex max-w-xl text-sm sm:text-base md:text-lg px-4 sm:px-0">
                            Expert care, personalized styling, and a luxurious experience await. Harsh Salon - where beauty and affordability go hand in hand.
                        </p>
                        <Button className="bg-white text-black border shadow-2xl hover:bg-gray-300 font-medium text-sm sm:text-base mt-2 sm:mt-3">
                            Book an Appointment Now
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
