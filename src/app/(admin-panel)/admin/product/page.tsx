"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Check, Pencil, Plus, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
import { toast } from "sonner"
import { api } from "@/trpc/react"
import useRefetch from "@/hooks/use-refetch"
import SalonLoader from "@/components/Loading"

interface Product {
    id: string
    name: string
    description: string
    price: string
    rating: string
    image: string
}

export default function ProductsPage() {

    const initialproduct: Product = {
        description: '',
        id: '',
        image: '',
        name: '',
        price: '',
        rating: ''
    }

    const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
        name: "",
        description: "",
        price: "0",
        rating: "4.0",
        image: "",
    })
    const [open, setOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploaded, setIsUploaded] = useState<boolean>(false);

    // routes for getting and submitting product data
    const createProduct = api.products.createProduct.useMutation();
    const products = api.products.getProducts.useQuery();

    const refetch = useRefetch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
            setIsVerified(false)
        }
    }


    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Upload file first");
        }

        setIsUploading(true)

        try {

            const formData = new FormData();
            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            const response = await fetch("/api/image", {
                method: 'POST',
                body: formData,
            })

            if (!response) {
                toast.error("Error while uploading")
            }

            const data = await response.json();
            setNewProduct({
                ...newProduct,
                image: data?.secureUrl
            })
            setIsVerified(true);
            setIsUploaded(true);

        } catch (error) {
            toast.error(error as string)
        }
        finally {
            setIsUploading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {

            await createProduct.mutateAsync({
                description: newProduct.description,
                image: newProduct.image,
                name: newProduct.name,
                price: newProduct.price,
                rating: newProduct.rating,
            }, {
                onSuccess: () => {
                    setNewProduct(initialproduct);
                    setIsVerified(false);
                    toast.success("product created successfully");
                    setOpen(false);
                    refetch();
                    setSelectedFile(null);
                }
            })

        } catch (error) {
            toast.error("Error while creating product")
            console.log(error);
            throw new Error("Error while creating product");
        }
    }

    if (products.isPending) {
        return (
            <div className="flex flex-col items-center justify-center w-full min-h-screen">
                <SalonLoader
                    speed="normal"
                />
                Loading Data...
            </div>

        )
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
                                <Button type="submit" disabled={!isVerified && !uploaded}
                                    className="cursor-pointer"
                                    variant={'default'}
                                >
                                    {
                                        createProduct.isPending ?
                                            ('Creating...') :
                                            ("Create Product")
                                    }
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {products?.data?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

function ProductCard({ product }: { product: Product }) {

    const [open, setOpen] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);
    const [editedProduct, setEditedProduct] = useState<Product>({
        description: product.description,
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        rating: product.rating
    })

    const deleteProducts = api.products.deleteProduct.useMutation();
    const refetch = useRefetch();


    const handelDelete = async (ProductId: string) => {

        try {

            await deleteProducts.mutateAsync({
                productId: ProductId
            }, {
                onSuccess: () => {
                    toast.success("Product Deleted Successfully");
                    refetch();
                }
            })

        } catch (error) {
            toast.error("Error while deleting product");
            console.log(error);
        }
    }

    const handleChange = () => {

    }

    return (
        <Card className="overflow-hidden h-full flex flex-col p-2">
            <div className="relative aspect-square bg-muted">
                <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-cover"
                />
            </div>

            <div className="p-1">
                <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                <div className="text-sm font-bold">{product.price}</div>
            </div>

            <div className="flex-grow p-1">
                <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                </p>
            </div>

            <div className="p-1 flex items-center justify-between">
                <div className="flex items-center text-xs">
                    <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                    <span>{product.rating}</span>
                </div>
                <div className="flex gap-x-2">
                    <Dialog open={open} onOpenChange={setOpen} >
                        <DialogTrigger asChild>
                            <Trash2
                                size={15} className="text-red-500 hover:text-orange-300 hover:cursor-pointer"
                            // onClick={() => handelDelete(product?.id)}
                            />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {product.name}
                                </DialogTitle>
                                <DialogDescription>
                                    This will permanently delete the item. You can't undo this
                                </DialogDescription>

                                <div className="flex gap-x-3 mt-3">
                                    <Button
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant={'destructive'}
                                        className="hover:cursor-pointer hover:bg-red-400"
                                        onClick={() => {
                                            handelDelete(product?.id);
                                            setOpen(false);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={open2} onOpenChange={setOpen2} >
                        <DialogTrigger asChild>
                            <Pencil size={15} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                        </DialogTrigger>
                        <DialogContent className="">
                            <form>
                                <DialogHeader>
                                    <DialogTitle>
                                        {product.name}
                                    </DialogTitle>
                                    <DialogDescription>
                                        Edit product
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col mt-4 space-y-4">
                                    <div className=" flex flex-col gap-y-2">
                                        <Label htmlFor="name">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={editedProduct.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className=" flex flex-col gap-y-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={editedProduct.description}
                                            onChange={handleChange}
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
                                                value={editedProduct.price}
                                                onChange={handleChange}
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
                                                value={editedProduct.rating}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-2 ">
                                        <Label htmlFor="file">Upload Image</Label>

                                        <div className="flex  gap-x-2">
                                            <Input
                                                type="file"
                                                name="file"
                                                id="file"
                                            />
                                            <Button className="w-fit">
                                                Upload
                                            </Button>
                                        </div>

                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </Card>
    );
}


