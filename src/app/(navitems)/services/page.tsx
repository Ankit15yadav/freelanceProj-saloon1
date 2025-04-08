'use client'

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { products } from '../../../data';
import type { Product } from '../../../types';
import { Check, Search } from 'lucide-react';
import Image from 'next/image';

export default function ProductsPage() {
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => setSearchQuery(searchInput), 300);
        return () => clearTimeout(handler);
    }, [searchInput]);

    // Memoized filtered products
    const filteredProducts = useMemo(() => products.filter(product => {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const matchesSearch = searchTerms.every(term =>
            product.name.toLowerCase().includes(term) ||
            product.description.toLowerCase().includes(term)
        );

        const matchesPrice = product.price >= priceRange[0] &&
            product.price <= priceRange[1];

        return matchesSearch && matchesPrice;
    }), [searchQuery, priceRange]);

    // Memoized sorted products
    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) =>
            sortOrder === 'asc' ? a.price - b.price :
                sortOrder === 'desc' ? b.price - a.price : 0
        );
    }, [filteredProducts, sortOrder]);

    // Reset all filters
    const resetFilters = useCallback(() => {
        setSearchInput('');
        setPriceRange([0, 100]);
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Simplified Sidebar */}
                <div className="border rounded-lg p-6 h-fit space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-medium">Price Range</h3>
                        <div className="flex justify-between mb-2 text-sm">
                            <span>${priceRange[0]}</span>
                            <span>${priceRange[1]}</span>
                        </div>
                        <div className="relative pb-4">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={priceRange[1]}
                                onChange={e => setPriceRange([0, Number(e.target.value)])}
                                className="absolute w-full"
                            />
                        </div>
                    </div>

                    {/* <div className="space-y-4">
            <h3 className="font-medium">Rating</h3>
            {[4.5, 4, 3].map(rating => (
              <div key={rating} className="flex items-center gap-3">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={product.rating >= rating}
                  onCheckedChange={checked => {
                    // Implement rating filter logic here if needed
                  }}
                />
                <label htmlFor={`rating-${rating}`} className="text-sm">
                  {rating}+ Stars
                </label>
              </div>
            ))}
          </div> */}

                    <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={resetFilters}
                    >
                        Clear All Filters
                    </Button>
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <Input
                                placeholder="Search products..."
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                                className="pr-10"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <Button
                                variant={!sortOrder ? 'default' : 'outline'}
                                onClick={() => setSortOrder(null)}
                                className="gap-2"
                            >
                                {!sortOrder && <Check className="h-4 w-4" />}
                                New Arrivals
                            </Button>
                            <Button
                                variant={sortOrder === 'asc' ? 'default' : 'outline'}
                                onClick={() => setSortOrder(sortOrder === 'asc' ? null : 'asc')}
                                className="gap-2"
                            >
                                {sortOrder === 'asc' && <Check className="h-4 w-4" />}
                                Price Low-High
                            </Button>
                            <Button
                                variant={sortOrder === 'desc' ? 'default' : 'outline'}
                                onClick={() => setSortOrder(sortOrder === 'desc' ? null : 'desc')}
                                className="gap-2"
                            >
                                {sortOrder === 'desc' && <Check className="h-4 w-4" />}
                                Price High-Low
                            </Button>
                        </div>
                    </div>

                    <div className="mb-4 text-sm text-muted-foreground">
                        Showing {sortedProducts.length} results
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sortedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square overflow-hidden">
                <Image
                    src={product.imageUrl}
                    width={200}
                    height={200}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-medium mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                    <p className="font-bold">${product.price}</p>
                    <div className="flex items-center gap-1">
                        <span className="text-sm">{product.rating}</span>
                        <svg className="w-4 h-4 fill-current text-yellow-500" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full rounded-full">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}