'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, MapPin, PhoneCall } from 'lucide-react';
import Image from 'next/image';

// Service Grid Component
const DiamondServiceGrid = () => {
    const services = [
        { id: 1, title: 'Bridal Makeup', icon: '💍', color: 'bg-rose-50' },
        { id: 2, title: 'Hair Styling', icon: '✂️', color: 'bg-purple-50' },
        { id: 3, title: 'Skin Care', icon: '🌸', color: 'bg-amber-50' },
        { id: 4, title: 'Spa Treatments', icon: '🛁', color: 'bg-teal-50' },
    ];

    return (
        <div className="flex justify-center py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: service.id * 0.1 }}
                    >
                        <div className={`flex flex-col items-center p-8 ${service.color} rounded-2xl shadow-sm hover:shadow-md transition-all duration-300`}>
                            <div className="text-4xl mb-4 text-gray-700">{service.icon}</div>
                            <span className="text-gray-700 font-medium text-lg text-center">
                                {service.title}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

type card = {
    title: string,
    description: string,
    icon: React.ReactNode,
    delay: number
}

// Feature Card Component
const FeatureCard = ({ title, description, icon, delay }: card) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            viewport={{ once: true }}
        >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border border-gray-100">
                <CardContent className="p-8">
                    <div className="mb-6 text-rose-500">{icon}</div>
                    <h3 className="text-xl font-medium mb-4 text-gray-800">{title}</h3>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
};

// Main About Component
const About = () => {
    const salonValues = [
        {
            title: "Expert Stylists",
            description: "Our team of highly trained professionals stay at the cutting edge of beauty trends to deliver exceptional results.",
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        },
        {
            title: "Premium Products",
            description: "We use only the finest quality, cruelty-free products that nourish and protect while delivering beautiful results.",
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
        },
        {
            title: "Relaxing Environment",
            description: "Step into our tranquil space designed to help you unwind and enjoy a moment of self-care away from daily stress.",
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18M12 3v18M7.5 7.5l9 9M16.5 7.5l-9 9" /></svg>
        },
        {
            title: "Personalized Care",
            description: "We believe in customized beauty treatments tailored to your unique features, preferences, and lifestyle.",
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
        }
    ];

    return (
        <main className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
                {/* Hero Section */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <motion.h1
                            className="text-4xl md:text-5xl font-serif font-normal text-gray-800 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="block text-lg md:text-xl font-sans font-medium text-rose-500 mb-4">
                                Since 2010
                            </span>
                            The Art of Beauty & Wellness
                        </motion.h1>

                        <motion.p
                            className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Award-winning salon offering luxury beauty experiences in the heart of the city
                        </motion.p>
                    </div>

                    <DiamondServiceGrid />

                    <motion.div
                        className="flex justify-center gap-4 mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 rounded-full text-lg">
                            Book Consultation
                            <CalendarDays className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 rounded-full text-lg"
                        >
                            View Services
                        </Button>
                    </motion.div>
                </section>

                {/* Content Section */}
                <section className="mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <motion.div
                            className="lg:col-span-5 order-2 lg:order-1"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose-100 rounded-full opacity-50"></div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-6 relative">
                                    Our Story
                                </h2>
                            </div>

                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Founded in 2010, our salon began with a vision to create a space where beauty meets tranquility. Our founder, a master stylist with over 15 years of experience, believed that beauty treatments should be more than just services—they should be experiences that nurture both appearance and wellbeing.
                            </p>

                            <p className="text-gray-700 mb-8 leading-relaxed">
                                Over the years, we&apos;ve grown from a small hair studio to a full-service beauty destination, but our commitment to personalized care, quality, and creating a welcoming environment has never wavered.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8 mb-6">
                                <div className="flex items-start">
                                    <Clock className="mr-2 text-rose-400 h-5 w-5 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium">Hours</h4>
                                        <p className="text-sm text-gray-600">Tue-Sat: 9am-7pm</p>
                                        <p className="text-sm text-gray-600">Sun: 10am-4pm</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="mr-2 text-rose-400 h-5 w-5 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium">Location</h4>
                                        <p className="text-sm text-gray-600">123 Beauty Lane</p>
                                        <p className="text-sm text-gray-600">New York, NY 10001</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <Button className="bg-rose-500 hover:bg-rose-600 transition-colors">
                                    Book Appointment <CalendarDays className="ml-2 h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="border-rose-500 text-rose-500 hover:bg-rose-50">
                                    Contact Us <PhoneCall className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="lg:col-span-7 order-1 lg:order-2"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                <div className="aspect-w-16 aspect-h-9">
                                    <Image
                                        src="/salon-interior.jpg"
                                        width={2000}
                                        height={2000}
                                        alt="Salon interior"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                                    <p className="text-white font-medium">Our elegant and welcoming salon space</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Values Section */}
                <section>
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">The Salon Experience</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            What sets us apart and makes every visit special
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {salonValues.map((value, index) => (
                            <FeatureCard
                                key={index}
                                title={value.title}
                                description={value.description}
                                icon={value.icon}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="mt-24">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Our Team</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The talented professionals behind your transformation
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            {
                                id: 1,
                                name: 'Ramharsh Sen',
                                role: '40 Years of Expertise',
                                image: '/team/ramharsh-sen.jpg',
                                bio: 'A true industry veteran with four decades of experience, Ramharsh Sen has mastered the art of hairstyling and salon management, setting the foundation for Harsh Salon’s excellence.'
                            },
                            {
                                id: 2,
                                name: 'Satish Sen',
                                role: '7 Years | L’Oréal, Matrix | London Certified',
                                image: '/team/satish-sen.jpg',
                                bio: 'An internationally trained hair color expert and precision haircut specialist, Satish blends global trends with personalized styles, bringing a touch of artistry to every transformation.'
                            },
                            {
                                id: 3,
                                name: 'Pintu Sen',
                                role: '18 Years of Craftsmanship',
                                image: '/team/pintu-sen.jpg',
                                bio: 'With nearly two decades in the industry, Pintu Sen is known for his impeccable styling techniques and a keen eye for modern hair trends.'
                            },
                            {
                                id: 4,
                                name: 'Uday Sen',
                                role: '14 Years of Styling Expertise',
                                image: '/team/uday-sen.jpg',
                                bio: 'From classic cuts to contemporary styles, Uday Sen specializes in precision cuts and customized looks tailored to each client’s personality.'
                            },
                            {
                                id: 5,
                                name: 'Rajesh Sen',
                                role: '19 Years of Hair & Grooming Excellence',
                                image: '/team/rajesh-sen.jpg',
                                bio: 'A grooming expert with a passion for hair treatments, Rajesh Sen ensures every client leaves with a flawless finish and renewed confidence.'
                            },
                            {
                                id: 6,
                                name: 'Ravina',
                                role: 'Beauty & Skincare Specialist',
                                image: '/team/ravina.jpg',
                                bio: 'With a deep understanding of skin and beauty, Ravina brings expertise in facials, makeup, and skincare solutions that enhance natural radiance.'
                            }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative rounded-2xl overflow-hidden aspect-square mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        height={200}
                                        width={200}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent p-6 flex items-end">
                                        <div className="text-left">
                                            <h3 className="text-white font-semibold text-lg">{member.name}</h3>
                                            <p className="text-rose-200 text-sm">{member.role}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Testimonial Section */}
                <section className="mt-24">
                    <motion.div
                        className="bg-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-rose-100 rounded-full -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-100 rounded-full -ml-10 -mb-10"></div>

                        <div className="relative">
                            <svg className="w-12 h-12 text-rose-300 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            <div className="space-y-8">
                                {[
                                    {
                                        text: "I've been coming to this salon for over three years and wouldn't trust anyone else with my hair. The stylists are incredibly talented, the atmosphere is so relaxing, and I always leave feeling beautiful and rejuvenated.",
                                        author: "Jennifer Parker",
                                        role: "Loyal client since 2020"
                                    },
                                    {
                                        text: "The bridal makeup service was absolutely flawless! Jessica listened to all my preferences and created the perfect look for my wedding day. I felt like the best version of myself.",
                                        author: "Emily Carter",
                                        role: "Bride, June 2023"
                                    },
                                    {
                                        text: "Michael's spa treatments are simply divine. The facial I received left my skin glowing for weeks. It's my monthly self-care ritual now!",
                                        author: "Sophia Martinez",
                                        role: "Spa regular"
                                    }
                                ].map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <p className="text-lg text-gray-700 italic mb-6">
                                            &quot;{testimonial.text} &quot;
                                        </p>
                                        <div className="flex items-center">
                                            <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                                            <div>
                                                <p className="font-semibold">{testimonial.author}</p>
                                                <p className="text-sm text-gray-600">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Final CTA Section */}
                <section className="mt-24 bg-rose-50 rounded-3xl p-8 md:p-12">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.h2
                            className="text-2xl md:text-3xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Ready for Your Transformation?
                        </motion.h2>
                        <motion.p
                            className="text-gray-600 mb-8 text-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Book your appointment today and experience the difference of our award-winning salon
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Button className="bg-rose-500 hover:bg-rose-600 px-8 py-6 rounded-full text-lg">
                                Book Now <CalendarDays className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default About;