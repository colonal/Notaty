'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from 'src/components/icons/eye_icons';
import { registerUser } from 'src/services/api';
import { UserManagementService } from 'src/services/userManagementService';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        general: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        // Redirect if already logged in
        if (UserManagementService.isLoggedIn()) {
            router.push('/');
        }
    }, [router]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { name: '', email: '', password: '', confirmPassword: '', general: '' };

        if (!formData.name) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({ name: '', email: '', password: '', confirmPassword: '', general: '' });

        try {
            const { confirmPassword, ...registerData } = formData;
            await registerUser(registerData);

            if (mounted) {
                router.push('/');
            }
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                general: error instanceof Error ? error.message : 'An error occurred during registration'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-3 sm:space-y-4">
                {errors.general && (
                    <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-3">
                        <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
                    </div>
                )}

                <div>
                    <label htmlFor="name" className="sr-only">
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className={`appearance-none rounded-lg relative block w-full px-3 sm:px-4 py-3 min-h-[46px] sm:min-h-[50px] text-sm sm:text-base border ${errors.name ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-[var(--foreground)] bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={`appearance-none rounded-lg relative block w-full px-3 sm:px-4 py-3 min-h-[46px] sm:min-h-[50px] text-sm sm:text-base border ${errors.email ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-[var(--foreground)] bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        placeholder="Email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                    )}
                </div>

                <div className="relative">
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className={`appearance-none rounded-lg relative block w-full px-3 sm:px-4 py-3 min-h-[46px] sm:min-h-[50px] text-sm sm:text-base border ${errors.password ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-[var(--foreground)] bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                    )}
                </div>

                <div className="relative">
                    <label htmlFor="confirmPassword" className="sr-only">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className={`appearance-none rounded-lg relative block w-full px-3 sm:px-4 py-3 min-h-[46px] sm:min-h-[50px] text-sm sm:text-base border ${errors.confirmPassword ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-[var(--foreground)] bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                    {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                    )}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span className="flex items-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Creating account...
                        </span>
                    ) : (
                        'Create Account'
                    )}
                </button>
            </div>

            <div className="text-center">
                <p className="text-sm text-[var(--foreground)] opacity-80">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
} 