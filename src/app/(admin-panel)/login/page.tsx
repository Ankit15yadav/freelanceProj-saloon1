"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

// Define the form validation schema using Zod
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
})

// Infer the type for our form data based on the Zod schema
type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLogin() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            const response = await res.json()

            console.log(response);

            if (!res.ok) {
                toast.error(response?.message || "Login failed")
            } else {
                toast.success("Login successful! Redirecting...")
                // Redirect to the admin dashboard
                router.push("/admin/dashboard")
            }
        } catch (error) {
            console.error("Login error:", error)
            toast.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center text-xl font-semibold">
                            Admin Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    {...register("email")}
                                    className="mt-1"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    {...register("password")}
                                    className="mt-1"
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </div>
                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
