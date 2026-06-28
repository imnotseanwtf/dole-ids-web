import { Head } from '@inertiajs/react';
import { ArrowUpDown, Check, FileText, Search } from 'lucide-react';
import { useState } from 'react';

const tabs = ['All (13)', 'Approved (2)', 'Preparing (2)', 'Shipped (3)', 'Delivered (2)', 'Returned (2)'];

const stages = ['Approved', 'Preparing', 'Shipped', 'Delivered'];

const deliveries = Array.from({ length: 3 }, () => ({
    ris: 'RIS#2026-04.096',
    status: 'Preparing',
    office: 'BATANGAS PROVINCIAL OFFICE',
    by: 'Cindy R. Cuenca - ADMIN',
    purpose: 'Supply',
    items: 'Epson 664, Cyan; Stamp Pad Ink, Black +3 Items',
    arrival: 'April 26, 2026',
    requested: 'April 22, 2026',
    count: 5,
    updated: 'April 23, 2026  10:15 AM',
    current: 1, // stages completed up to (exclusive)
}));

function Stepper({ current }: { current: number }) {
    return (
        <div className="flex items-center">
            {stages.map((stage, i) => {
                const done = i < current;

                return (
                    <div key={stage} className="flex flex-1 flex-col items-center">
                        <div className="flex w-full items-center">
                            <span className={`h-px flex-1 ${i === 0 ? 'opacity-0' : done ? 'bg-[#4784ff]' : 'bg-[#5e5e5e]/20'}`} />
                            <span
                                className={`flex size-6 items-center justify-center rounded-full border ${
                                    done ? 'border-[#4784ff] bg-[#4784ff] text-white' : 'border-[#5e5e5e]/30 text-transparent'
                                }`}
                            >
                                <Check className="size-3.5" />
                            </span>
                            <span className={`h-px flex-1 ${i === stages.length - 1 ? 'opacity-0' : i < current - 1 ? 'bg-[#4784ff]' : 'bg-[#5e5e5e]/20'}`} />
                        </div>
                        <p className="mt-1.5 text-[11px] text-[#1f1f1f]">{stage}</p>
                        {done ? (
                            <span className="text-[10px] font-medium text-[#26b002]">Completed</span>
                        ) : (
                            <span className="rounded bg-[#f0f0f0] px-1.5 text-[10px] text-[#5e5e5e]/70">Pending</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function ProvincialDelivery() {
    const [active, setActive] = useState(0);

    return (
        <div className="px-12 py-6">
            <Head title="Delivery" />

            <h1 className="text-[20px] font-bold text-[#1f1f1f]">Delivery</h1>

            <div className="mt-3 flex gap-6 overflow-x-auto border-b border-[#5e5e5e]/15 text-[13px]">
                {tabs.map((tab, i) => (
                    <button
                        key={tab}
                        onClick={() => setActive(i)}
                        className={`whitespace-nowrap ${active === i ? 'border-b-2 border-[#4784ff] pb-2 font-medium text-[#1f1f1f]' : 'pb-2 text-[#5e5e5e]/60'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
                <div className="flex h-9 w-72 items-center gap-2 rounded-full border border-[#5e5e5e]/20 bg-white px-4">
                    <Search className="size-4 text-[#5e5e5e]/60" />
                    <input
                        className="w-full bg-transparent text-[12px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/60 focus:outline-none"
                        placeholder="Search by RIS, Item..."
                    />
                </div>
                <button className="ml-auto flex h-9 items-center gap-1.5 rounded-md border border-[#5e5e5e]/20 bg-white px-3 text-[12px] text-[#5e5e5e]">
                    Sort <ArrowUpDown className="size-3.5" />
                </button>
            </div>

            <div className="mt-4 flex flex-col gap-4">
                {deliveries.map((d, i) => (
                    <div key={i} className="grid grid-cols-1 gap-4 rounded-lg border border-[#5e5e5e]/15 bg-white p-4 lg:grid-cols-[1fr_1.3fr_1fr]">
                        <div className="lg:border-r lg:border-[#5e5e5e]/10 lg:pr-4">
                            <div className="flex items-center gap-2">
                                <FileText className="size-4 text-[#4784ff]" />
                                <span className="text-[12px] font-medium text-[#1f1f1f]">{d.ris}</span>
                                <span className="rounded-full bg-[#fff8da] px-2 py-0.5 text-[10px] font-medium text-[#d7ad00]">{d.status}</span>
                            </div>
                            <p className="mt-2 text-[13px] font-semibold text-[#1f1f1f]">{d.office}</p>
                            <p className="mt-1 text-[11px] text-[#5e5e5e]/80">Requested by/ Unit: {d.by}</p>
                            <p className="text-[11px] text-[#5e5e5e]/80">Purpose: {d.purpose}</p>
                            <p className="mt-2 flex items-center gap-1.5 text-[11px] text-[#5e5e5e]/80">
                                <FileText className="size-3.5 text-[#5e5e5e]/50" />
                                {d.items}
                            </p>
                        </div>

                        <div className="flex items-center lg:border-r lg:border-[#5e5e5e]/10 lg:px-4">
                            <Stepper current={d.current} />
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 text-[11px] lg:pl-4">
                            <div>
                                <p className="text-[#616162]/70">Estimate Arrival</p>
                                <p className="font-medium text-[#1f1f1f]">{d.arrival}</p>
                            </div>
                            <div>
                                <p className="text-[#616162]/70">Pick Up Driver</p>
                                <p className="font-medium text-[#1f1f1f]">-</p>
                            </div>
                            <div>
                                <p className="text-[#616162]/70">Date Requested</p>
                                <p className="font-medium text-[#1f1f1f]">{d.requested}</p>
                            </div>
                            <div>
                                <p className="text-[#616162]/70">Items</p>
                                <p className="font-medium text-[#1f1f1f]">{d.count}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-[#616162]/70">Last Update</p>
                                <p className="font-medium text-[#1f1f1f]">{d.updated}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
