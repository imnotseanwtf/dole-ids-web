import { Link, usePage } from '@inertiajs/react';
import {
    CircleUser,
    ClipboardCheck,
    FileText,
    LayoutGrid,
    LogOut,
    Package,
    Users,
    Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';

type NavItem = { title: string; href: string; icon: LucideIcon };

const navItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin', icon: LayoutGrid },
    { title: 'User Management', href: '/admin/users', icon: Users },
    { title: 'Inventory', href: '/admin/inventory', icon: Package },
    { title: 'Requests Management', href: '/admin/requests', icon: ClipboardCheck },
    { title: 'Reports', href: '/admin/reports', icon: FileText },
    { title: 'System', href: '/admin/system', icon: Wrench },
];

export default function AdminLayout({ children }: PropsWithChildren) {
    const { url } = usePage();

    const isActive = (href: string) =>
        href === '/admin' ? url === '/admin' : url.startsWith(href);

    return (
        <div className="flex min-h-screen bg-[#f6f6f6] text-[#5e5e5e]">
            <aside className="flex w-[211px] flex-col gap-4 px-3 py-5">
                <div className="flex items-center gap-2 px-1">
                    <AppLogoIcon className="size-9" />
                    <span className="text-[11px] font-semibold leading-tight text-[#5e5e5e]">
                        Department of Labor and Employment
                    </span>
                </div>

                <Link
                    href="/admin/profile"
                    className="flex items-center gap-2 rounded-sm border border-[#5e5e5e]/40 px-2 py-2 hover:bg-[#f6f6f6]"
                >
                    <CircleUser className="size-6 text-[#616162]" strokeWidth={1.25} />
                    <span className="text-[10px] leading-tight text-[#616162]">
                        Flavio Deza III
                        <br />
                        fdeza@gmail.com
                    </span>
                </Link>

                <p className="px-1 pt-2 text-[10px] text-[#616162]">NAVIGATION</p>

                <nav className="flex flex-col gap-1">
                    {navItems.map(({ title, href, icon: Icon }) => {
                        const active = isActive(href);

                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 rounded-[5px] px-3 py-1.5 text-[12px] ${
                                    active
                                        ? 'bg-[#e2edff] font-medium text-[#4784ff]'
                                        : 'text-[#5e5e5e] hover:bg-[#f0f0f0]'
                                }`}
                            >
                                <Icon className="size-4" strokeWidth={1.75} />
                                {title}
                            </Link>
                        );
                    })}
                </nav>

                <Link
                    href="/login"
                    className="mt-auto flex items-center gap-3 px-3 py-1.5 text-[12px] text-[#5e5e5e] hover:text-[#e12e31]"
                >
                    <LogOut className="size-4" strokeWidth={1.75} />
                    Log out
                </Link>
            </aside>

            <main className="flex-1 overflow-x-hidden bg-white px-11 py-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                {children}
            </main>
        </div>
    );
}
