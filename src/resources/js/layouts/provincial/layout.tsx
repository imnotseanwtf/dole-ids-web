import { Link, usePage } from '@inertiajs/react';
import {
    Bell,
    CheckCheck,
    CircleUser,
    LogOut,
    ShoppingCart,
    User,
    X,
} from 'lucide-react';
import { useState, type PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';

// ponytail: navy is eyeballed from the Figma export; swap for the real token
// once Figma MCP access is restored.
const NAVY = '#1c3c61';

const navItems = [
    { title: 'Home', href: '/provincial' },
    { title: 'Supply Catalog', href: '/provincial/catalog' },
    { title: 'My Requests', href: '/provincial/requests' },
    { title: 'Deliveries', href: '/provincial/delivery' },
];

type Notif = { title: string; body: string; time: string; tone: 'green' | 'red'; unread?: boolean };

const notifications: { group: string; items: Notif[] }[] = [
    {
        group: 'Today',
        items: [
            { title: 'RIS-XXXX-XX needs item feedback', body: 'Write your review to confirm delivery.', time: 'Yesterday', tone: 'green' },
            { title: 'Request Declined', body: 'RIS-XXXX-XX is declined due to duplication of request.', time: '1 hr ago', tone: 'red' },
            { title: 'Request Approved', body: 'RIS-XXXX-XX is approved.', time: '13 min ago', tone: 'green', unread: true },
            { title: 'Request Approved', body: 'RIS-XXXX-XX is approved.', time: '13 min ago', tone: 'green', unread: true },
            { title: 'Request Declined', body: 'RIS-XXXX-XX is declined. No more remaining quantity is available.', time: '1 hr ago', tone: 'red' },
        ],
    },
    {
        group: 'Yesterday',
        items: [
            { title: 'RIS-XXXX-XX is done preparing', body: 'You can schedule your pick-up now.', time: 'Yesterday', tone: 'green' },
        ],
    },
];

export default function ProvincialLayout({ children }: PropsWithChildren) {
    const { url } = usePage();
    const [showNotifs, setShowNotifs] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const isActive = (href: string) =>
        href === '/provincial' ? url === '/provincial' : url.startsWith(href);

    return (
        <div className="min-h-screen bg-[#f6f6f6] text-[#5e5e5e]">
            <header
                className="flex h-[57px] items-center gap-8 px-6 text-white"
                style={{ backgroundColor: NAVY }}
            >
                <Link href="/provincial" className="flex items-center gap-2">
                    <AppLogoIcon className="size-8" />
                    <span className="text-[12px] font-semibold leading-tight">
                        Department of Labor
                        <br />
                        and Employment
                    </span>
                </Link>

                <nav className="flex flex-1 items-center justify-center gap-10">
                    {navItems.map(({ title, href }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`text-[14px] ${
                                isActive(href)
                                    ? 'font-semibold text-white'
                                    : 'text-white/70 hover:text-white'
                            }`}
                        >
                            {title}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        href="/provincial/ppmp"
                        className="rounded-md border border-white/80 px-4 py-1.5 text-[13px] font-medium hover:bg-white/10"
                    >
                        Upload PPMP
                    </Link>

                    <div className="relative">
                        <button onClick={() => { setShowNotifs((v) => !v); setShowProfile(false); }} aria-label="Notifications">
                            <Bell className="size-5" strokeWidth={1.75} />
                        </button>
                        {showNotifs && <NotificationsPanel onClose={() => setShowNotifs(false)} />}
                    </div>

                    <Link href="/provincial/cart" aria-label="Cart">
                        <ShoppingCart className="size-5" strokeWidth={1.75} />
                    </Link>

                    <div className="relative">
                        <button onClick={() => { setShowProfile((v) => !v); setShowNotifs(false); }} aria-label="Profile">
                            <CircleUser className="size-6" strokeWidth={1.5} />
                        </button>
                        {showProfile && (
                            <div className="absolute right-0 top-9 z-20 w-44 overflow-hidden rounded-lg border border-black/10 bg-white py-1 text-[#5e5e5e] shadow-lg">
                                <Link href="/provincial/profile" className="flex items-center gap-2 px-4 py-2 text-[13px] hover:bg-[#f0f0f0]">
                                    <User className="size-4" strokeWidth={1.75} />
                                    Profile
                                </Link>
                                <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-[13px] hover:bg-[#f0f0f0] hover:text-[#e12e31]">
                                    <LogOut className="size-4" strokeWidth={1.75} />
                                    Log out
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="min-h-[calc(100vh-57px)] bg-white">{children}</main>
        </div>
    );
}

function NotificationsPanel({ onClose }: { onClose: () => void }) {
    const [tab, setTab] = useState<'all' | 'unread'>('all');

    return (
        <div className="absolute right-0 top-9 z-20 w-[370px] rounded-lg border border-black/10 bg-white text-[#5e5e5e] shadow-xl">
            <div className="flex items-center justify-between px-4 pt-3">
                <h3 className="text-[14px] font-semibold text-[#1f1f1f]">Notifications</h3>
                <div className="flex items-center gap-3">
                    <button aria-label="Mark all read"><CheckCheck className="size-4 text-[#4784ff]" /></button>
                    <button onClick={onClose} aria-label="Close"><X className="size-4" /></button>
                </div>
            </div>

            <div className="flex gap-4 border-b border-black/10 px-4 pt-2 text-[12px]">
                <button
                    onClick={() => setTab('all')}
                    className={tab === 'all' ? 'border-b-2 border-[#4784ff] pb-2 font-medium text-[#1f1f1f]' : 'pb-2 text-[#5e5e5e]/60'}
                >
                    All (10)
                </button>
                <button
                    onClick={() => setTab('unread')}
                    className={tab === 'unread' ? 'border-b-2 border-[#4784ff] pb-2 font-medium text-[#1f1f1f]' : 'pb-2 text-[#5e5e5e]/60'}
                >
                    Unread (5)
                </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto px-4 pb-3">
                {notifications.map(({ group, items }) => (
                    <div key={group}>
                        <p className="py-2 text-[11px] text-[#616162]/70">{group}</p>
                        {items
                            .filter((n) => (tab === 'unread' ? n.unread : true))
                            .map((n, i) => (
                                <div key={i} className="flex items-start gap-3 py-2">
                                    <span
                                        className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-white ${
                                            n.tone === 'green' ? 'bg-[#26b002]' : 'bg-[#e12e31]'
                                        }`}
                                    >
                                        <CheckCheck className="size-3.5" />
                                    </span>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-[12px] font-medium text-[#1f1f1f]">{n.title}</p>
                                            <span className="flex items-center gap-1 whitespace-nowrap text-[10px] text-[#616162]/70">
                                                {n.time}
                                                {n.unread && <span className="size-1.5 rounded-full bg-[#4784ff]" />}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-[#5e5e5e]/80">{n.body}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
