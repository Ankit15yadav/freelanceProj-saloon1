'use client'
import * as React from "react"
import { User2 } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { toast } from "sonner"

// This is sample data.
const data = {
    Tabs: [
        {
            title: 'Analytics',
            url: '/admin/dashboard',
            id: 5

        },
        {
            title: "Bookings",
            url: "/admin/bookings",
            id: 1
        },
        {
            title: "Products",
            url: "/admin/product",
            id: 2
        },
        {
            title: "Blogs",
            url: "/admin/blogs",
            id: 3
        }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {

            const res = await fetch("/api/logout", {
                method: 'POST'
            })

            if (res.ok) {
                toast.success("Logged out successfully");
                router.push("/login")
            }
            else {
                toast.error("Logout failed")
            }

        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/home">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <User2 className="size-4" />
                                </div>
                                <div className="flex flex-col text-sm gap-0.5 leading-none">
                                    <span className="font-semibold">Admin Panel</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Dashboard
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {data.Tabs.map((item) => (
                            <SidebarMenuItem key={item.id}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}
                                        className={cn(
                                            `font-medium px-3 py-2 rounded transition-colors
                                        ${pathname === item.url ? '!bg-[#A2D485]' : 'bg-gray-50'} `

                                        )}>
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className='bg-inherit'>
                <Button className="bg-red-400 text-white text-sm font-medium hover:bg-red-300
                cursor-pointer
                "
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
