import { Head } from '@inertiajs/react';
import {
    CheckCheck,
    CircleCheck,
    CircleX,
    PackageCheck,
    PackageX,
    RefreshCw,
    Search,
    Inbox,
    TriangleAlert
    
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import PageHeading from '@/components/central/page-heading';

type Notif = { title: string; time: string; body: string; unread?: boolean };

const icons: Record<string, LucideIcon> = {
    'New Request!': Inbox,
    'Low Stock Alert!': TriangleAlert,
    'Request Approved': CircleCheck,
    'Out of Stock': PackageX,
    'Request Declined': CircleX,
    'Stock Updated': PackageCheck,
    'System Update Available': RefreshCw,
};

const today: Notif[] = [
    { title: 'New Request!', time: '3 min ago', body: 'CAVITE requested 5 items.', unread: true },
    { title: 'Low Stock Alert!', time: '10 min ago', body: 'Ballpoint Pen (Black) is running low (8 boxes). The stock level is running low and may require restocking soon.', unread: true },
    { title: 'Request Approved', time: '13 min ago', body: 'BATANGAS’s request for Paper Clips has been approved by Flavio Deza IX. The stock request has been approved and is ready for processing.' },
    { title: 'Out of Stock', time: '20 min ago', body: 'Correction Tape is now out of stock. This item is currently out of stock and unavailable for requests or issuance.' },
    { title: 'Request Declined', time: '1 hr ago', body: 'BATANGAS’S request for A4 Notebook was declined by Kurt Aquino. The stock request has been reviewed and was not approved. Details below: Reason, approver, date, item info, etc.' },
];

const yesterday: Notif[] = [
    { title: 'Stock Updated', time: 'Yesterday', body: 'Bond Paper (Short) stock updated to 100 units. The inventory has been successfully updated with the latest stock changes. View details below.' },
    { title: 'Request Declined', time: 'Yesterday', body: 'RIZAL’S request for Calculator was declined by Flavio Deza I. The stock request has been reviewed and was not approved. Details below: Reason, approver, date, item info, etc.' },
    { title: 'System Update Available', time: 'Yesterday', body: 'A new system update is ready to install. System is preparing to execute a scheduled installation based on command input. Temporary system limitations may occur.' },
    { title: 'Low Stock Alert!', time: 'Yesterday', body: 'Bond Paper (Short) is running low (5 reams). The stock level is running low and may require restocking soon.' },
    { title: 'Low Stock Alert!', time: '3 day ago', body: 'Highlighter is running low (6 pcs). The stock level is running low and may require restocking soon.' },
];

function NotifRow({ n }: { n: Notif }) {
    const Icon = icons[n.title] ?? Inbox;

    return (
        <div className="flex items-start gap-3 py-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-[5px] bg-[#eff4fb]">
                <Icon className="size-3.5 text-[#4784ff]" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[12px] font-medium text-[#5e5e5e]">{n.title}</p>
                    <span className="shrink-0 text-[10px] text-[#616162]/60">{n.time}</span>
                </div>
                <p className="text-[10px] text-[#616162]/80">{n.body}</p>
            </div>
            {n.unread && <span className="mt-1 size-2 shrink-0 rounded-full bg-[#4784ff]" />}
        </div>
    );
}

export default function CentralNotifications() {
    return (
        <>
            <Head title="Notifications" />

            <PageHeading title="Notifications" subtitle="View system alerts and updates" />

            <div className="flex items-center gap-8 text-[12px]">
                <button className="font-medium text-[#5e5e5e]">
                    All <span className="font-light">(13)</span>
                </button>
                <button className="text-[#5e5e5e]/50">
                    Unread <span className="font-light">(2)</span>
                </button>
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-[#5e5e5e]/20 pt-4">
                <div className="flex h-7 w-56 items-center gap-2 rounded-[5px] border-[0.2px] border-[#5e5e5e]/50 px-2">
                    <Search className="size-3.5 text-[#5e5e5e]/70" />
                    <input
                        className="w-full bg-transparent text-[10px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/70 focus:outline-none"
                        placeholder="Search by RIS, Item..."
                    />
                </div>
                <button
                    className="ml-auto flex size-7 items-center justify-center rounded-[2px] bg-[#f6f6f6]"
                    title="Mark all as read"
                >
                    <CheckCheck className="size-3.5 text-[#5e5e5e]" />
                </button>
            </div>

            <p className="mt-5 text-[12px] font-medium text-[#5e5e5e]">Today</p>
            <div className="divide-y divide-[#5e5e5e]/10">
                {today.map((n, i) => (
                    <NotifRow key={i} n={n} />
                ))}
            </div>

            <p className="mt-5 text-[12px] font-medium text-[#5e5e5e]">Yesterday</p>
            <div className="divide-y divide-[#5e5e5e]/10">
                {yesterday.map((n, i) => (
                    <NotifRow key={i} n={n} />
                ))}
            </div>
        </>
    );
}
