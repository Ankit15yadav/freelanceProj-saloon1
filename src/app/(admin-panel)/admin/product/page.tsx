"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Check, Plus, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Product type definition
interface Product {
    id: string
    name: string
    description: string
    price: string
    rating: number
    image: string
}

// Demo data
const demoProducts: Product[] = [
    {
        id: "1",
        name: "Premium Headphones",
        description: "Noise-cancelling wireless headphones with premium sound quality.",
        price: "24999",
        rating: 4.7,
        image: "/services/service-3.svg",
    },
    {
        id: "2",
        name: "Smart Watch",
        description: "Track your fitness and stay connected with this sleek smart watch.",
        price: "19999",
        rating: 4.5,
        image: "/services/service-4.svg",
    },
    {
        id: "3",
        name: "Wireless Keyboard",
        description: "Ergonomic wireless keyboard with customizable RGB lighting.",
        price: "8999",
        rating: 4.2,
        image: "/services/service-5.svg",
    },
    {
        id: "4",
        name: "Premium Headphones",
        description: "Noise-cancelling wireless headphones with premium sound quality.",
        price: "24999",
        rating: 4.7,
        image: "/services/service-3.svg",
    },
    {
        id: "5",
        name: "Smart Watch",
        description: "Track your fitness and stay connected with this sleek smart watch.",
        price: "19999",
        rating: 4.5,
        image: "/services/service-4.svg",
    },
    {
        id: "6",
        name: "Wireless Keyboard",
        description: "Ergonomic wireless keyboard with customizable RGB lighting.",
        price: "8999",
        rating: 4.2,
        image: "/services/service-5.svg",
    },
]

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>(demoProducts)
    const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
        name: "",
        description: "",
        price: "0",
        rating: 4.0,
        image: "/placeholder.svg?height=200&width=200",
    })
    const [open, setOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewProduct({
            ...newProduct,
            [name]: name === "price" || name === "rating" ? Number.parseFloat(value) : value,
        })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
            setIsVerified(false)
        }
    }

    const handleUpload = () => {
        if (!selectedFile) return

        setIsUploading(true)

        // Simulate upload process
        setTimeout(() => {
            setIsUploading(false)
            setIsVerified(true)
            // In a real app, this would be the URL returned from the cloud storage
            setNewProduct({
                ...newProduct,
                image: "/placeholder.svg?height=200&width=200",
            })
        }, 1500)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const id = (products.length + 1).toString()
        setProducts([...products, { id, ...newProduct }])
        setNewProduct({
            name: "",
            description: "",
            price: "0",
            rating: 4.0,
            image: "/placeholder.svg?height=200&width=200",
        })
        setSelectedFile(null)
        setIsVerified(false)
        setOpen(false)
    }

    // Format price in rupees
    const formatPrice = (price: number) => {
        return `₹${price.toLocaleString("en-IN")}`
    }

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Products</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>Fill in the details to create a new product.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={newProduct.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">Price (₹)</Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="text"
                                            min="0"
                                            step="1"
                                            value={newProduct.price}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="rating">Rating (4-5)</Label>
                                        <Input
                                            id="rating"
                                            name="rating"
                                            type="number"
                                            min="4.0"
                                            max="5.0"
                                            step="0.1"
                                            value={newProduct.rating}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Product Image</Label>
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="flex-1"
                                            />
                                            <Button
                                                type="button"
                                                size="sm"
                                                onClick={handleUpload}
                                                disabled={!selectedFile || isUploading || isVerified}
                                                className="whitespace-nowrap"
                                            >
                                                {isUploading ? "Uploading..." : "Upload"}
                                            </Button>
                                        </div>
                                        {selectedFile && (
                                            <div
                                                className={cn(
                                                    "text-sm flex items-center",
                                                    isVerified ? "text-green-500" : "text-muted-foreground",
                                                )}
                                            >
                                                {isVerified ? (
                                                    <>
                                                        <Check className="h-4 w-4 mr-1" /> Image verified and ready to use
                                                    </>
                                                ) : (
                                                    "Please upload the image to continue"
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={!isVerified && selectedFile !== null}>
                                    Create Product
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                <CreateProductCard onClick={() => setOpen(true)} />
            </div>
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="overflow-hidden h-full flex flex-col">
            <div className="aspect-square relative bg-muted">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <CardHeader className="p-3">
                <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                <div className="text-sm font-bold">{product.price}</div>
            </CardHeader>
            <CardContent className="flex-grow p-3 pt-0">
                <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter className="p-3 pt-0">
                <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                    <span>{product.rating.toFixed(1)}</span>
                </div>
            </CardFooter>
        </Card>
    )
}

function CreateProductCard({ onClick }: { onClick: () => void }) {
    return (
        <Card
            className="overflow-hidden h-full flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors aspect-square"
            onClick={onClick}
        >
            <CardContent className="flex flex-col items-center justify-center h-full p-4">
                <div className="rounded-full bg-primary/10 p-4 mb-2">
                    <Plus className="h-5 w-5 text-primary" />
                </div>
                <p className="font-medium text-xs text-center">Add Product</p>
            </CardContent>
        </Card>
    )
}
