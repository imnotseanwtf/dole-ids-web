import { Head } from '@inertiajs/react';
import { ArrowUpDown, ListFilter, Search } from 'lucide-react';
import PageHeading from '@/components/admin/page-heading';

type ReqStatus = 'Approved' | 'Pending' | 'Declined';

const tabs = [
    { label: 'All', count: 13 },
    { label: 'Today', count: 2 },
    { label: 'Pending', count: 3 },
    { label: 'Approved', count: 2 },
    { label: 'Declined', count: 2 },
];

const rows: {
    ris: string;
    office: string;
    qty: number;
    stock: string;
    status: ReqStatus;
    by?: string;
    date: string;
    unread?: boolean;
}[] = [
    { ris: 'RIS#XXXXXXXX', office: 'Cavite Provincial Office', qty: 34, stock: 'In Stock', status: 'Approved', by: 'Flavio', date: '2026-02-10', unread: true },
    { ris: 'RIS#XXXXXXXX', office: 'Batangas Provincial Office', qty: 34, stock: 'Low Stock', status: 'Pending', date: '2026-02-15' },
    { ris: 'RIS#XXXXXXXX', office: 'Batangas Provincial Office', qty: 34, stock: 'In Stock', status: 'Approved', by: 'Flavio', date: '2026-01-28' },
    { ris: 'RIS#XXXXXXXX', office: 'Cavite Provincial Office', qty: 35, stock: 'Low Stock', status: 'Pending', date: '2026-02-18' },
    { ris: 'RIS#XXXXXXXX', office: 'Rizal Provincial Office', qty: 36, stock: 'In Stock', status: 'Approved', by: 'Flavio', date: '2026-01-20' },
    { ris: 'RIS#XXXXXXXX', office: 'Rizal Provincial Office', qty: 24, stock: 'Out of Stock', status: 'Declined', by: 'Kurt', date: '2026-01-30' },
    { ris: 'RIS#XXXXXXXX', office: 'Quezon Provincial Office', qty: 25, stock: 'In Stock', status: 'Approved', by: 'Flavio', date: '2026-02-05' },
    { ris: 'RIS#XXXXXXXX', office: 'Quezon Provincial Office', qty: 37, stock: 'Out of Stock', status: 'Declined', date: '2026-01-25' },
];

const statusStyle: Record<ReqStatus, string> = {
    Approved: 'bg-[#eaffe4] text-[#26b002]',
    Pending: 'bg-[#fff8da] text-[#d7ad00]',
    Declined: 'bg-[#fddddd] text-[#e12e31]',
};

export default function AdminRequests() {
    return (
        <>
            <Head title="Request Management" />

            <PageHeading title="Request Management" subtitle="View requests here" />

            <div className="flex items-center gap-8 border-b border-[#5e5e5e]/20 pb-3 text-[13px]">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.label}
                        className={i === 0 ? 'border-b-2 border-[#4784ff] pb-3 font-medium text-[#1f1f1f]' : 'text-[#5e5e5e]/50'}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            <div className="my-4 flex items-center gap-2">
                <div className="flex h-9 w-72 items-center gap-2 rounded-full bg-white px-4 shadow-sm">
                    <Search className="size-4 text-[#5e5e5e]/60" />
                    <input
                        className="w-full bg-transparent text-[12px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/60 focus:outline-none"
                        placeholder="Search by RIS, Item..."
                    />
                </div>
                <button className="ml-auto flex size-9 items-center justify-center rounded-md bg-white shadow-sm">
                    <ArrowUpDown className="size-4 text-[#4784ff]" />
                </button>
                <button className="flex size-9 items-center justify-center rounded-md bg-white shadow-sm">
                    <ListFilter className="size-4 text-[#4784ff]" />
                </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#5e5e5e]/15 bg-white">
                <table className="w-full text-left text-[12px] text-[#5e5e5e]">
                    <thead>
                        <tr className="bg-[#f6f6f6] text-[10px] font-medium">
                            <th className="px-5 py-3 font-medium">RIS Number</th>
                            <th className="font-medium">Office/ Branch</th>
                            <th className="font-medium">Total Quantity</th>
                            <th className="font-medium">Stock status</th>
                            <th className="font-medium">Request status</th>
                            <th className="pr-5 font-medium">Date Requested</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i} className="border-t border-[#5e5e5e]/10 hover:bg-[#f6f6f6]/60">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-2">
                                        {r.unread && <span className="size-2 rounded-full bg-[#4784ff]" />}
                                        {r.ris}
                                    </div>
                                </td>
                                <td>{r.office}</td>
                                <td>{r.qty}</td>
                                <td>{r.stock}</td>
                                <td>
                                    <span className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-medium ${statusStyle[r.status]}`}>
                                        {r.status}
                                    </span>
                                    {r.by && <p className="mt-0.5 text-[9px] text-[#4784ff]">by {r.by}</p>}
                                </td>
                                <td className="pr-5">{r.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
