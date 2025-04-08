import Navbar from "@/components/Navbar";
import { Footer } from "@/components/footer";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="max-w-full min-h-screen">
            <Navbar />
            {children}
            <Footer />
        </main>


    );
}
