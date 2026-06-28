import { Head } from '@inertiajs/react';
import {
    CircleCheck,
    CircleX,
    Inbox,
    PackageCheck,
    PackageX,
    RefreshCw,
    TriangleAlert
    
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import PageHeading from '@/components/admin/page-heading';

type Notif = { title: string; time: string; body: string; unread?: boolean };

const meta: Record<string, { icon: LucideIcon; color: string; bg: string }> = {
    'New Request!': { icon: Inbox, color: 'text-[#4784ff]', bg: 'bg-[#e2edff]' },
    'Low Stock Alert!': { icon: TriangleAlert, color: 'text-[#d7ad00]', bg: 'bg-[#fff8da]' },
    'Request Approved': { icon: CircleCheck, color: 'text-[#26b002]', bg: 'bg-[#eaffe4]' },
    'Out of Stock': { icon: PackageX, color: 'text-[#e12e31]', bg: 'bg-[#fddddd]' },
    'Request Declined': { icon: CircleX, color: 'text-[#e12e31]', bg: 'bg-[#fddddd]' },
    'Stock Updated': { icon: PackageCheck, color: 'text-[#26b002]', bg: 'bg-[#eaffe4]' },
    'System Update Available': { icon: RefreshCw, color: 'text-[#4784ff]', bg: 'bg-[#eff4fb]' },
};

const today: Notif[] = [
    { title: 'New Request!', time: '3 min ago', body: 'CAVITE requested 5 box Ballpoint Pen (Black).', unread: true },
    { title: 'Low Stock Alert!', time: '10 min ago', body: 'Ballpoint Pen (Black) is running low (8 boxes).', unread: true },
    { title: 'Request Approved', time: '13 min ago', body: "BATANGAS's request for Paper Clips has been approved by Flavio Deza IX.", unread: true },
    { title: 'Out of Stock', time: '20 min ago', body: 'Correction Tape is now out of stock.', unread: true },
    { title: 'Request Declined', time: '1 hr ago', body: "BATANGAS's request for A4 Notebook was declined by Kurt Aquino.", unread: true },
];

const yesterday: Notif[] = [
    { title: 'Stock Updated', time: 'Yesterday', body: 'Bond Paper (Short) stock updated to 100 units.' },
    { title: 'Request Declined', time: 'Yesterday', body: "RIZAL's request for Calculator was declined by Flavio Deza I." },
    { title: 'System Update Available', time: '2 day ago', body: 'A new system update is ready to install.' },
    { title: 'Low Stock Alert!', time: '3 day ago', body: 'Bond Paper (Short) is running low (5 reams).' },
    { title: 'Low Stock Alert!', time: '3 day ago', body: 'Highlighter is running low (6 pcs).' },
];

function Row({ n }: { n: Notif }) {
    const m = meta[n.title] ?? meta['New Request!'];
    const Icon = m.icon;

    return (
        <div className="flex items-start gap-3 py-3">
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-full ${m.bg}`}>
                <Icon className={`size-4 ${m.color}`} />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[13px] font-semibold text-[#1f1f1f]">{n.title}</p>
                    <span className="shrink-0 text-[11px] text-[#616162]/60">{n.time}</span>
                </div>
                <p className="text-[11px] text-[#616162]/80">{n.body}</p>
            </div>
            {n.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#4784ff]" />}
        </div>
    );
}

export default function AdminNotifications() {
    return (
        <>
            <Head title="Notifications" />

            <PageHeading title="Notifications" subtitle="View system alerts and updates" />

            <div className="mb-2 flex items-center gap-8 border-b border-[#5e5e5e]/20 pb-3 text-[13px]">
                <button className="border-b-2 border-[#4784ff] pb-3 font-medium text-[#1f1f1f]">All (10)</button>
                <button className="text-[#5e5e5e]/50">Unread (5)</button>
            </div>

            <div className="rounded-xl border border-[#5e5e5e]/15 bg-white px-5 py-2">
                <p className="pt-2 text-[12px] font-semibold text-[#616162]">Today</p>
                <div className="divide-y divide-[#5e5e5e]/10">
                    {today.map((n, i) => (
                        <Row key={i} n={n} />
                    ))}
                </div>

                <p className="pt-3 text-[12px] font-semibold text-[#616162]">Yesterday</p>
                <div className="divide-y divide-[#5e5e5e]/10">
                    {yesterday.map((n, i) => (
                        <Row key={i} n={n} />
                    ))}
                </div>
            </div>
        </>
    );
}
