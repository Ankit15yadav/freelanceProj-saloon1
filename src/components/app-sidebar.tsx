'use client'
import * as React from "react"
import { User2 } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import path from "path"
import { cn } from "@/lib/utils"

// This is sample data.
const data = {
    Tabs: [
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
            <SidebarRail />
        </Sidebar>
    )
}
