"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import Image from "next/image"
import { api } from "@/trpc/react"

export interface Product {
    id: string
    name: string
    description: string
    price: string
    rating: string
    image: string
}

export default function ProductsPage() {
    // Fetch products data
    const { data, isLoading, isError } = api.products.getProducts.useQuery()
    const [products, setProducts] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    // Filter states
    const [searchQuery, setSearchQuery] = useState("")
    const [priceRange, setPriceRange] = useState([0, 10000])
    const [selectedRatings, setSelectedRatings] = useState<string[]>([])

    useEffect(() => {
        if (data) {
            setProducts(data)
            setFilteredProducts(data)
        }
    }, [data])

    useEffect(() => {
        if (products.length > 0) {
            applyFilters()
        }
    }, [searchQuery, priceRange, selectedRatings, products])

    const applyFilters = () => {
        let filtered = [...products]

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Apply price filter
        filtered = filtered.filter((product) => {
            const price = Number.parseFloat(product.price)
            return price >= priceRange[0]! && price <= priceRange[1]!
        })

        // Apply rating filter
        if (selectedRatings.length > 0) {
            filtered = filtered.filter((product) =>
                selectedRatings.includes(Math.floor(Number.parseFloat(product.rating)).toString()),
            )
        }

        setFilteredProducts(filtered)
    }

    const handleRatingChange = (rating: string) => {
        setSelectedRatings((prev) => (prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]))
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>Loading products...</p>
            </div>
        )
    }

    if (isError) {
        return <div className="text-center p-8 text-red-500">Error loading products. Please try again later.</div>
    }

    // Find max price for slider
    const maxPrice = products.length > 0 ? Math.max(...products.map((p) => Number.parseFloat(p.price))) : 10000

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            <div className="flex flex-col md:flex-row gap-6 relative">
                {/* Filter sidebar - make it sticky */}
                <div className="w-full md:w-64 shrink-0 md:sticky md:top-4 md:self-start h-fit">
                    <div className="border rounded-lg p-4 space-y-4">
                        <h2 className="font-semibold text-lg">Filters</h2>

                        {/* Search */}
                        <div className="space-y-2">
                            <Label htmlFor="search">Search</Label>
                            <Input
                                id="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Price Range */}
                        <div className="space-y-2">
                            <Label>
                                Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
                            </Label>
                            <Slider
                                defaultValue={[0, maxPrice]}
                                max={maxPrice}
                                step={100}
                                value={priceRange}
                                onValueChange={setPriceRange}
                            />
                        </div>

                        {/* Rating Filter */}
                        <div className="space-y-2">
                            <Label>Rating</Label>
                            <div className="space-y-2">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <div key={rating} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`rating-${rating}`}
                                            checked={selectedRatings.includes(rating.toString())}
                                            onCheckedChange={() => handleRatingChange(rating.toString())}
                                        />
                                        <Label htmlFor={`rating-${rating}`} className="flex items-center">
                                            {Array(rating)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                                ))}
                                            {Array(5 - rating)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 text-muted-foreground" />
                                                ))}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products grid - make it scrollable */}
                <div className="flex-1 overflow-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center p-12 border rounded-lg">
                            <p className="text-muted-foreground">No products match your filters.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {
    const imageSource = product.image || "/placeholder.svg"
    const rating = Number.parseFloat(product.rating)
    const price = Number.parseFloat(product.price)

    return (
        <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] overflow-hidden">
                <Image
                    src={imageSource || "/placeholder.svg"}
                    width={300}
                    height={225}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
            </div>
            <CardContent className="p-4 flex-grow">
                <h3 className="font-medium text-base line-clamp-1">{product.name}</h3>
                <div className="flex items-center my-1">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                        ))}
                    <span className="text-xs ml-1 text-muted-foreground">({product.rating})</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
                <div className="font-bold text-lg">₹{price.toLocaleString("en-IN")}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button className="w-full rounded-full">Buy Now</Button>
            </CardFooter>
        </Card>
    )
}
