import { Head } from '@inertiajs/react';
import { ImageIcon, Search, Tag } from 'lucide-react';
import PageHeading from '@/components/central/page-heading';

type Status = 'Preparing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';

const tabs = [
    { label: 'All', count: 13 },
    { label: 'Preparing', count: 2 },
    { label: 'Shipped', count: 3 },
    { label: 'Delivered', count: 2 },
    { label: 'Cancelled', count: 2 },
    { label: 'Returned', count: 2 },
];

const statusStyle: Record<Status, string> = {
    Preparing: 'bg-[#fff8da] text-[#d7ad00]',
    Shipped: 'bg-[#eff4fb] text-[#4784ff]',
    Delivered: 'bg-[#eaffe4] text-[#26b002]',
    Cancelled: 'bg-[#fddddd] text-[#e12e31]',
    Returned: 'bg-[#f0f0f0] text-[#5e5e5e]',
};

const deliveries: {
    office: string;
    requestedBy: string;
    dateRequested: string;
    ris: string;
    items: string;
    purpose: string;
    note: string;
    status: Status;
}[] = [
    { office: 'BATANGAS PROVINCIAL OFFICE', requestedBy: 'Cindy R. Cuenca - ADMIN', dateRequested: '04-24-26', ris: '2026-04.096', items: 'Epson 664, Cyan; Stamp Pad Ink, Black +3 Items', purpose: 'Supply', note: 'Please prepare 30 April, 26', status: 'Preparing' },
    { office: 'BATANGAS PROVINCIAL OFFICE', requestedBy: 'Cindy R. Cuenca - ADMIN', dateRequested: '04-24-26', ris: '2026-04.096', items: 'Epson 664, Cyan; Stamp Pad Ink, Black +3 Items', purpose: 'Supply', note: 'Please prepare 30 April, 26', status: 'Preparing' },
    { office: 'BATANGAS PROVINCIAL OFFICE', requestedBy: 'Cindy R. Cuenca - ADMIN', dateRequested: '04-24-26', ris: '2026-04.096', items: 'Epson 664, Cyan; Stamp Pad Ink, Black +3 Items', purpose: 'Supply', note: '', status: 'Delivered' },
];

export default function CentralDelivery() {
    return (
        <>
            <Head title="Delivery" />

            <PageHeading title="Delivery" subtitle="Manage item deliveries and track delivery status" />

            <div className="flex items-center gap-8 text-[12px]">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.label}
                        className={i === 0 ? 'font-medium text-[#5e5e5e]' : 'text-[#5e5e5e]/50'}
                    >
                        {tab.label} <span className="font-light">({tab.count})</span>
                    </button>
                ))}
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-[#5e5e5e]/20 pt-4">
                <div className="flex h-7 w-56 items-center gap-2 rounded-[5px] border-[0.2px] border-[#5e5e5e]/50 px-2">
                    <Search className="size-3.5 text-[#5e5e5e]/70" />
                    <input
                        className="w-full bg-transparent text-[10px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/70 focus:outline-none"
                        placeholder="Search by RIS, Item..."
                    />
                </div>
            </div>

            <div className="mt-4 space-y-3">
                {deliveries.map((d, i) => (
                    <div key={i} className="rounded-[5px] border border-[#5e5e5e]/15 p-3 text-[12px] text-[#5e5e5e]">
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                            <span><span className="text-[#616162]/60">Office/Branch:</span> {d.office}</span>
                            <span><span className="text-[#616162]/60">Requested by/ Unit:</span> {d.requestedBy}</span>
                            <span><span className="text-[#616162]/60">Date Requested:</span> {d.dateRequested}</span>
                            <span className="ml-auto">RIS#{d.ris}</span>
                        </div>

                        <hr className="my-2 border-[#5e5e5e]/15" />

                        <div className="flex items-center gap-3">
                            <div className="flex">
                                {[0, 1, 2].map((n) => (
                                    <div
                                        key={n}
                                        className="-ml-2 flex size-[50px] items-center justify-center rounded-[5px] border border-[#5e5e5e]/10 bg-white shadow-[1px_0px_2px_0px_rgba(0,0,0,0.25)] first:ml-0"
                                    >
                                        <ImageIcon className="size-5 text-[#5e5e5e]/40" />
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="font-medium">{d.items}</p>
                                <p className="text-[10px] text-[#616162]/70">Purpose: {d.purpose}</p>
                            </div>

                            <div className="ml-auto flex items-center gap-4">
                                {d.note && <span className="text-[10px] text-[#616162]/70">{d.note}</span>}
                                <span className={`rounded-full px-3 py-0.5 text-[10px] font-medium ${statusStyle[d.status]}`}>
                                    {d.status}
                                </span>
                                <button className="flex items-center gap-1 rounded-[5px] border border-[#5e5e5e]/30 px-2 py-1 text-[10px]">
                                    <Tag className="size-3" />
                                    Print Label
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
