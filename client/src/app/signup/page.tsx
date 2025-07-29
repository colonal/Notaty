import Image from 'next/image';
import SignupForm from './component/signup_form';

export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 py-8 sm:px-6 sm:py-12">
            <div className="w-full max-w-md space-y-6 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-xl shadow-2xl transform transition-all hover:scale-[1.01]">
                <div className="text-center">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={220}
                        height={120}
                        className="mx-auto w-[160px] sm:w-[220px] h-auto object-contain"
                        priority
                    />
                    <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-extrabold text-[var(--foreground)]">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm sm:text-base text-[var(--foreground)] opacity-80">
                        Join us today and get started
                    </p>
                </div>

                <SignupForm />
            </div>
        </div>
    );
}
