import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

// ponytail: the real DOLE triangle logo isn't in the repo as an asset — using
// AppLogoIcon as a stand-in next to the tagline. Drop the official mark in when
// available.
export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh items-center justify-center overflow-hidden p-6">
            {/* PH-flag gradient backdrop + corner triangles */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8bb8ff] via-[#fdf3b0] to-[#ff9a9a]" />
            <div className="absolute right-0 top-0 size-0 border-r-[200px] border-t-[200px] border-r-transparent border-t-[#1b3a8f]" />
            <div className="absolute bottom-0 right-0 size-0 border-b-[320px] border-l-[320px] border-b-[#d33] border-l-transparent" />

            <div className="relative z-10 grid w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl md:grid-cols-2">
                {/* Brand panel */}
                <div className="hidden flex-col items-center justify-center gap-3 border-r border-black/5 p-10 md:flex">
                    <Link href={home()} aria-label="Home">
                        <AppLogoIcon className="size-32 fill-current text-[#1b3a8f]" />
                    </Link>
                    <p className="-mt-2 text-[22px] font-semibold italic text-[#d33]">More than Jobs!</p>
                    <p className="-mt-2 text-[22px] font-semibold italic text-[#d33]">It&apos;s decent jobs.</p>
                </div>

                {/* Form panel */}
                <div className="relative bg-[#eef3fb]/70 p-10 pb-14">
                    <h1 className="text-[22px] font-bold text-[#1f1f1f]">{title}</h1>
                    {description && <p className="mt-1 text-[12px] text-[#5e5e5e]/80">{description}</p>}

                    <div className="mt-6">{children}</div>

                    <p className="absolute bottom-4 left-10 text-[11px] text-[#5e5e5e]/60">© 2026 DOLE.</p>
                </div>
            </div>
        </div>
    );
}
