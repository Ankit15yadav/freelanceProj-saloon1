"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { LogIn, Menu, ShoppingBag, X } from "lucide-react"
import { usePathname } from "next/navigation"

interface NavItem {
    label: string
    href: string
}

const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Blogs", href: "/blogs" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" }
]

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [scrolled, setScrolled] = useState<boolean>(false)
    const pathname = usePathname()

    const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = (): void => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: Event): void => {
            const target = event.target as HTMLElement
            if (isMenuOpen && !target.closest("header")) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isMenuOpen])
    // Close menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = (): void => {
            if (window.innerWidth >= 1024 && isMenuOpen) {
                setIsMenuOpen(false)
            }
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [isMenuOpen])

    const desktopLinkClass = (href: string): string =>
        `text-lg ${pathname === href ? "font-bold underline underline-offset-4" : "font-medium"
        } text-gray-900 hover:text-gray-600 transition-colors`

    const mobileLinkClass = (href: string): string =>
        `block text-lg ${pathname === href ? "font-bold underline underline-offset-4" : "font-light"
        } text-gray-900 hover:text-gray-600`

    return (
        <header
            className={`sticky top-0 z-50 w-11/12 mx-auto mt-8 rounded-3xl border shadow-xl border-gray-200 bg-white transition-all duration-300 ${scrolled ? "shadow-2xl" : ""
                }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
                {/* Logo */}
                <div className="flex items-center">
                    <Link
                        href="/"
                        className={`text-xl ${pathname === "/" ? "font-bold" : "font-medium"
                            }`}
                    >
                        LOGO
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className={desktopLinkClass(item.href)}>
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA and Cart */}
                <div className="hidden md:flex items-center gap-x-3">
                    <Link
                        href="/services"
                        className={`rounded-full border-2 shadow-md border-gray-900 px-6 py-2 text-lg ${pathname === "/book-now" ? "font-bold underline underline-offset-4" : "font-medium"
                            } text-gray-900 hover:bg-gray-100 transition-colors`}
                    >
                        Book Now
                    </Link>
                    <Link
                        href="/login"
                        className="p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <LogIn size={24} />
                    </Link>
                </div>

                {/* Medium Tablet Horizontal Navigation */}
                <nav className="hidden md:flex lg:hidden items-center space-x-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-base ${pathname === item.href ? "font-bold underline underline-offset-4" : "font-medium"
                                } text-gray-900 hover:text-gray-600 transition-colors`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/book-now"
                        className={`rounded-full border-2 border-gray-900 px-4 py-1 text-base ${pathname === "/book-now" ? "font-bold" : "font-medium"
                            } text-gray-900 hover:bg-gray-100 transition-colors`}
                    >
                        Book Now
                    </Link>
                </nav>

                {/* Mobile Cart Button & Menu Toggle */}
                <div className="flex md:hidden items-center gap-x-2">
                    <Link
                        href="/cart"
                        className="p-2 rounded-md text-gray-900 hover:bg-gray-100 transition-colors"
                    >
                        <ShoppingBag size={24} />
                    </Link>
                    <button
                        className="rounded-md p-2 text-gray-900 hover:bg-gray-100"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="container mx-auto space-y-4 bg-white px-4 py-4 rounded-b-3xl">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={mobileLinkClass(item.href)}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/services"
                            className={`block w-full rounded-full border-2 border-gray-900 px-6 py-2 text-center text-lg ${pathname === "/book-now" ? "font-bold underline underline-offset-4" : "font-medium"
                                } text-gray-900 hover:bg-gray-100 transition-colors`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar
