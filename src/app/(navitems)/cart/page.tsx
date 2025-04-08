"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Demo data for initial cart items
const initialCartItems = [
    {
        id: 1,
        name: "Beard Trim",
        bookingSlot: "10:30 am",
        price: 349,
        quantity: 1,
        image: "/cart/Rectangle.svg",
    },
    {
        id: 2,
        name: "Hair Cut",
        bookingSlot: "10:45 am",
        price: 499,
        quantity: 1,
        image: "/cart/Rectangle-2.svg",
    },
    {
        id: 3,
        name: "Hair-Colour Inoa",
        bookingSlot: "11 am",
        price: 1199,
        quantity: 1,
        image: "/cart/Rectangle-3.svg",
    },
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems)
    const [promoCode, setPromoCode] = useState("")

    // Calculate subtotal based on items and quantities
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    const total = subtotal

    // Update quantity of an item
    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return

        setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    // Remove an item from cart
    const removeItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

    // Clear the entire cart
    const clearCart = () => {
        setCartItems([])
    }

    // Apply promo code (placeholder functionality)
    const applyPromoCode = () => {
        // This would typically validate the promo code against a backend
        alert(`Promo code "${promoCode}" applied!`)
        setPromoCode("")
    }

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart Items Section */}
                <div className="w-full lg:w-2/3">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-medium">{cartItems.length} products</h1>
                        <Button variant="outline" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={clearCart}>
                            <X className="h-4 w-4 mr-1" /> Clear cart
                        </Button>
                    </div>

                    {cartItems.length > 0 ? (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <Card key={item.id} className="p-4 rounded-lg border">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-24 w-24 rounded-md overflow-hidden">
                                                <Image
                                                    src={item.image || "/placeholder.svg"}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    onError={(e) => {
                                                        // Fallback for missing images
                                                        const target = e.target as HTMLImageElement
                                                        target.src = "/placeholder.svg?height=96&width=96"
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg">{item.name}</h3>
                                                <p className="text-gray-600">Booking Slot : {item.bookingSlot}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                <div className="flex items-center border rounded-md">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-l-md"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-r-md"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="text-xl font-semibold min-w-[100px] text-right">{item.price} ₹</div>

                                            <Button
                                                variant="ghost"
                                                className="text-gray-500 hover:text-red-500"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <X className="h-4 w-4 mr-1" /> Remove
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}

                            <div className="flex justify-end mt-4">
                                <Button variant="outline" className="bg-gray-100">
                                    Update cart
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Your cart is empty</p>
                        </div>
                    )}
                </div>

                {/* Order Summary Section */}
                <div className="w-full lg:w-1/3">
                    <Card className="p-6 rounded-lg">
                        <h2 className="text-xl font-medium mb-4">Promo code</h2>
                        <div className="flex gap-2 mb-6">
                            <Input
                                placeholder="Type here..."
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="flex-1"
                            />
                            <Button className="bg-black text-white hover:bg-gray-800" onClick={applyPromoCode}>
                                Apply
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹ {subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service Charge</span>
                                <span>₹ {100}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹ {20}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold text-lg">
                                <span></span>
                                <span>₹ {total.toLocaleString()}</span>
                            </div>
                        </div>

                        <Button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white" size="lg">
                            Continue to Checkout
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

