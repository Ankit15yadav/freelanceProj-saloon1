import Link from "next/link"
import { ExternalLink, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-[#121212] text-gray-300 py-10 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Description */}
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-2xl font-medium text-white">Logo</h2>
                        <p className="text-sm leading-relaxed opacity-80">
                            A Bootstrap theme that&aspos;s both stylish and functional, perfect for any type of technology or corporate website.
                        </p>
                        <div className="pt-4 md:pt-6 text-xs opacity-70">
                            Copyrights ©2025 Mizzle. Built by Stackbros.
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4 md:space-y-6">
                        <h3 className="text-lg font-medium text-white">Quick links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Contact us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Career
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Career detail
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Become a partner
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Sign in
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Community */}
                    <div className="space-y-4 md:space-y-6">
                        <h3 className="text-lg font-medium text-white">Community</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Documents
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="flex items-center text-sm hover:text-white transition-colors">
                                    Supports
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Faqs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    News and blogs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm hover:text-white transition-colors">
                                    Terms & condition
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-4 md:space-y-6">
                        <h3 className="text-lg font-medium text-white">Follow on</h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="#" className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-colors">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-colors">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                            <Link href="#" className="bg-gray-800 p-2 rounded-md hover:bg-gray-700 transition-colors">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
