import { Head } from '@inertiajs/react';
import {
    ArrowUpRight,
    Boxes,
    CircleCheck,
    CircleX,
    Clock,
    PackageX,
    TriangleAlert
    
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import PageHeading from '@/components/admin/page-heading';

const stats: { label: string; value: string; icon: LucideIcon; color: string }[] = [
    { label: 'TOTAL INVENTORY', value: '14', icon: Boxes, color: 'text-[#4784ff]' },
    { label: 'LOW STOCK', value: '5', icon: TriangleAlert, color: 'text-[#d7ad00]' },
    { label: 'OUT OF STOCK', value: '14', icon: PackageX, color: 'text-[#e12e31]' },
    { label: 'OUT OF STOCK', value: '14', icon: PackageX, color: 'text-[#e12e31]' },
];

type ReqStatus = 'Pending' | 'Approved' | 'Declined';

const recentRequests: { ris: string; office: string; date: string; status: ReqStatus }[] = [
    { ris: 'RIS#XXXXXXXX', office: 'Cavite Provincial Office', date: 'April 10, 2026', status: 'Pending' },
    { ris: 'RIS#XXXXXXXX', office: 'Batangas Provincial Office', date: 'April 10, 2026', status: 'Approved' },
    { ris: 'RIS#XXXXXXXX', office: 'Rizal Provincial Office', date: 'April 10, 2026', status: 'Declined' },
    { ris: 'RIS#XXXXXXXX', office: 'Rizal Provincial Office', date: 'April 10, 2026', status: 'Approved' },
    { ris: 'RIS#XXXXXXXX', office: 'Quezon Provincial Office', date: 'April 10, 2026', status: 'Approved' },
];

const popularItems = [
    { name: 'Bond Paper (Short)', id: 'ITM004', dot: 'bg-[#d7ad00]' },
    { name: 'Ballpoint Pen (Black)', id: 'ITM002', dot: 'bg-[#d7ad00]' },
    { name: 'Highlighter', id: 'ITM009', dot: 'bg-[#d7ad00]' },
    { name: 'Ink (Black)', id: 'ITM010', dot: 'bg-[#d7ad00]' },
    { name: 'Correction Tape', id: 'ITM006', dot: 'bg-[#e12e31]' },
];

const activities = [
    { icon: Clock, color: 'text-[#d7ad00]', who: 'Cavite', text: 'requested 5 reams of Bond Paper (Short)', time: '1m' },
    { icon: CircleCheck, color: 'text-[#26b002]', who: 'Flavio D.', text: 'approved a request of Ballpoint Pens', time: '5m' },
    { icon: CircleX, color: 'text-[#e12e31]', who: 'Flavio D.', text: 'declined a request of A4 Notebooks', time: '30m' },
];

const reqStatusColor: Record<ReqStatus, string> = {
    Pending: 'text-[#d7ad00]',
    Approved: 'text-[#26b002]',
    Declined: 'text-[#e12e31]',
};

const panel = 'rounded-xl border border-[#5e5e5e]/15 bg-white p-6';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <PageHeading title="Dashboard" subtitle="Explore your needs here" search />

            <div className="rounded-2xl border border-[#5e5e5e]/15 bg-white p-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map(({ label, value, icon: Icon, color }, i) => (
                        <div key={i} className="relative h-[100px] rounded-xl border border-[#5e5e5e]/15 px-5 py-4">
                            <div className="flex items-center gap-2">
                                <Icon className={`size-5 ${color}`} strokeWidth={1.75} />
                                <span className="text-[12px] font-bold tracking-wide text-[#5e5e5e]">{label}</span>
                            </div>
                            <span className="absolute bottom-3 left-5 text-[28px] font-bold text-[#1f1f1f]">{value}</span>
                            <ArrowUpRight className="absolute bottom-4 right-4 size-4 text-[#5e5e5e]" />
                        </div>
                    ))}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                    <div className={panel}>
                        <h2 className="mb-3 text-[16px] font-bold text-[#1f1f1f]">Recent Requests</h2>
                        <table className="w-full text-left text-[12px] text-[#5e5e5e]">
                            <thead>
                                <tr className="text-[#616162]/70">
                                    <th className="pb-2 font-medium">RIS Number</th>
                                    <th className="pb-2 font-medium">Office/ Branch</th>
                                    <th className="pb-2 font-medium">Date</th>
                                    <th className="pb-2 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.map((r, i) => (
                                    <tr key={i} className="border-t border-[#5e5e5e]/10">
                                        <td className="py-2.5">{r.ris}</td>
                                        <td className="py-2.5">{r.office}</td>
                                        <td className="py-2.5">{r.date}</td>
                                        <td className={`py-2.5 ${reqStatusColor[r.status]}`}>{r.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={panel}>
                        <h2 className="mb-3 text-[16px] font-bold text-[#1f1f1f]">Popular Requested Items</h2>
                        <ul className="space-y-3">
                            {popularItems.map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <span className={`size-2 rounded-full ${item.dot}`} />
                                    <span className="size-7 rounded border border-[#5e5e5e]/20" />
                                    <div className="text-[12px]">
                                        <p className="font-medium text-[#1f1f1f]">{item.name}</p>
                                        <p className="text-[10px] text-[#616162]/70">{item.id}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                    <div className={panel}>
                        <h2 className="mb-3 text-[16px] font-bold text-[#1f1f1f]">Recent Activities</h2>
                        <ul className="space-y-3">
                            {activities.map(({ icon: Icon, color, who, text, time }, i) => (
                                <li key={i} className="flex items-center gap-3 text-[13px]">
                                    <Icon className={`size-4 ${color}`} />
                                    <p className="flex-1 text-[#5e5e5e]">
                                        <span className="font-bold text-[#1f1f1f]">{who}</span> {text}
                                    </p>
                                    <span className="text-[12px] text-[#616162]/60">{time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={panel}>
                        <h2 className="mb-3 text-[16px] font-bold text-[#1f1f1f]">Activity Summary (Today)</h2>
                        <ul className="space-y-2 text-[13px]">
                            <li className="flex justify-between"><span className="font-medium text-[#1f1f1f]">Request</span><span>1</span></li>
                            <li className="flex justify-between"><span className="font-medium text-[#1f1f1f]">Approved</span><span>2</span></li>
                            <li className="flex justify-between"><span className="font-medium text-[#1f1f1f]">Declined</span><span>1</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
