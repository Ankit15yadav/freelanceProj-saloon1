import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Example component name; you can rename as desired
export default function BookingSection() {
    return (
        <section className="w-full bg-white">
            {/* 
        Hero container with background (light gray), 
        then the image centered at the top
      */}
            <div className="relative w-full bg-gray-100 pt-20 pb-32 flex flex-col items-center">
                {/* The top image */}
                {/* The booking form card, overlapping the gray background */}
                <div className="w-full max-w-md bg-white rounded-md shadow-md p-6 -mt-16">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Booking Form
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Book Your Appointment
                    </p>

                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <Label htmlFor="fullName" className="mb-1 block">
                                Full Name
                            </Label>
                            <Input id="fullName" placeholder="Enter your name" />
                        </div>

                        {/* Location */}
                        <div>
                            <Label htmlFor="location" className="mb-1 block">
                                Location
                            </Label>
                            <Input id="location" placeholder="Enter your location" />
                        </div>

                        {/* Contact Number */}
                        <div>
                            <Label htmlFor="contactNumber" className="mb-1 block">
                                Contact Number
                            </Label>
                            <Input id="contactNumber" placeholder="Enter your number" />
                        </div>

                        {/* Services */}
                        <div>
                            <Label htmlFor="services" className="mb-1 block">
                                Services
                            </Label>
                            <Input id="services" placeholder="Which service do you want?" />
                        </div>

                        {/* Terms Checkbox */}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms">I accept the terms</Label>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 mt-4">
                            <Button variant="default" className="w-full sm:w-auto">
                                Confirm Booking
                            </Button>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Schedule For Later
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info boxes */}
            <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Box 1 */}
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <div className="text-xl font-semibold mb-2">Salon Address</div>
                    <p className="text-gray-600">Lorem Ipsum</p>
                </div>

                {/* Box 2 */}
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <div className="text-xl font-semibold mb-2">Call Us On</div>
                    <p className="text-gray-600">Lorem Ipsum</p>
                </div>

                {/* Box 3 */}
                <div className="bg-white rounded-lg shadow p-4 text-center">
                    <div className="text-xl font-semibold mb-2">Mail Us On</div>
                    <p className="text-gray-600">Lorem Ipsum</p>
                </div>
            </div>

            {/* Map Section */}
            <div className="max-w-5xl mx-auto px-4 pb-8">
                {/* You can embed a real Google Map here if you want */}
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
                    {/* Replace with an <iframe> or an Image for a real map */}
                    <span className="text-gray-500">Map goes here</span>
                </div>
            </div>
        </section>
    );
}
