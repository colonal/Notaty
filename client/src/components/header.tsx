"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserManagementService } from "src/services/userManagementService";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const user = UserManagementService.getCurrentUser();

    const handleLogout = () => {
        UserManagementService.logout();
        router.push("/login");
    };

    return (
        <header className="bg-[var(--background)] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center hover:opacity-80 transition-opacity"
                    >
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={160}
                            height={40}
                            className="h-30 w-auto"
                            priority
                        />
                    </Link>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center justify-center w-10 h-10 rounded-lg 
                                     bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-gray-800
                                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                     dark:focus:ring-offset-gray-900 transition-all duration-200
                                     border border-gray-300 dark:border-gray-600"
                        >
                            <svg
                                className="w-5 h-5 text-[var(--foreground)]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <>
                                {/* Backdrop */}
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsMenuOpen(false)}
                                />

                                {/* Menu */}
                                <div
                                    className="absolute right-0 mt-2 min-w-[16rem] max-w-sm rounded-lg shadow-lg 
                                             bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-600
                                             transform opacity-100 scale-100 transition-all duration-200 
                                             origin-top-right z-50"
                                >
                                    <div
                                        className="py-1"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu"
                                    >
                                        {user ? (
                                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                <div className="flex flex-col gap-1 min-w-0">
                                                    <span className="font-semibold text-[var(--foreground)] truncate">{user.name}</span>
                                                    <span className="text-sm text-gray-500 dark:text-gray-400 break-all">{user.email}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                                <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
                                            </div>
                                        )}
                                        <div className="py-1">
                                            <button
                                                onClick={handleLogout}
                                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200
                                                         hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                                                role="menuitem"
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    <span>Logout</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
} 