import type { Metadata } from "next"
import AdminDashboard from "@/components/admin-dashboard"

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin dashboard for analytics and data management",
}

export default function Page() {
    return <AdminDashboard />
}
