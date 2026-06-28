import { Link } from '@inertiajs/react';
import { Bell, Search } from 'lucide-react';

export default function PageHeading({
    title,
    subtitle,
    search = false,
}: {
    title: string;
    subtitle: string;
    search?: boolean;
}) {
    return (
        <header className="mb-6 flex items-center justify-between gap-4">
            <div>
                <h1 className="text-[26px] font-bold text-[#1f1f1f]">{title}</h1>
                <p className="text-[12px] text-[#616162]/75">{subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
                {search && (
                    <div className="flex h-9 w-64 items-center gap-2 rounded-full bg-white px-4 shadow-sm">
                        <Search className="size-4 text-[#5e5e5e]/60" />
                        <input
                            className="w-full bg-transparent text-[12px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/60 focus:outline-none"
                            placeholder="Search anything..."
                        />
                    </div>
                )}
                <Link
                    href="/admin/notifications"
                    className="flex size-9 items-center justify-center rounded-full bg-white text-[#5e5e5e] shadow-sm"
                >
                    <Bell className="size-4" />
                </Link>
                <Link
                    href="/admin/profile"
                    className="flex size-9 items-center justify-center rounded-full bg-[#4784ff] text-[11px] font-semibold text-white"
                >
                    FD
                </Link>
            </div>
        </header>
    );
}
