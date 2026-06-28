import { Head } from '@inertiajs/react';
import { ArrowUpDown, ImageIcon, ListFilter, Search, SquareArrowOutUpRight } from 'lucide-react';
import PageHeading from '@/components/central/page-heading';

const tabs = [
    { label: 'All', count: 13 },
    { label: 'Today', count: 2 },
    { label: 'Pending', count: 3 },
    { label: 'Approved', count: 2 },
    { label: 'Declined', count: 2 },
];

const requests = [
    { ris: 'XXXXXXX', item: 'Calculator', qty: 2, date: '03-01-26', from: 'BATANGAS- ADMIN', purpose: 'Supply' },
    { ris: 'XXXXXXX', item: 'Calculator', qty: 2, date: '03-01-26', from: 'RIZAL- ADMIN', purpose: 'Supply' },
    { ris: 'XXXXXXX', item: 'Calculator', qty: 2, date: '03-01-26', from: 'QUEZON- ADMIN', purpose: 'Supply' },
    { ris: '2026-04.096', item: 'Calculator', qty: 2, date: '03-01-26', from: 'CAVITE- ADMIN', purpose: 'Supply' },
];

export default function CentralRequests() {
    return (
        <>
            <Head title="Request Approvals" />

            <PageHeading
                title="Request Approvals"
                subtitle="Review, approve, or reject submitted item requests"
            />

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
                <button className="ml-auto flex h-7 items-center gap-1 rounded-[2px] bg-[#f6f6f6] px-3 text-[10px] text-[#5e5e5e]">
                    <ArrowUpDown className="size-3" />
                    Sort
                </button>
                <button className="flex h-7 items-center gap-1 rounded-[2px] bg-[#f6f6f6] px-3 text-[10px] text-[#5e5e5e]">
                    <ListFilter className="size-3.5" />
                    Filter
                </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {requests.map((req, i) => (
                    <div
                        key={i}
                        className="relative rounded-[2px] bg-[#f6f6f6] p-4 text-[10px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]"
                    >
                        <div className="flex items-start justify-between">
                            <p className="font-medium text-black">RIS#: {req.ris}</p>
                            <button>
                                <SquareArrowOutUpRight className="size-3.5 text-[#5e5e5e]" />
                            </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <span className="font-medium text-[#616162]/50">Items:</span>
                            <div className="flex items-center gap-2">
                                <div className="text-right font-medium text-[#5e5e5e]">
                                    <p>{req.item}</p>
                                    <p className="text-[8px]">x{req.qty}</p>
                                </div>
                                <div className="flex">
                                    {[0, 1, 2].map((n) => (
                                        <div
                                            key={n}
                                            className="-ml-2 flex size-[25px] items-center justify-center rounded-[5px] border border-[#5e5e5e]/10 bg-white shadow-[1px_0px_2px_0px_rgba(0,0,0,0.25)] first:ml-0"
                                        >
                                            <ImageIcon className="size-3 text-[#5e5e5e]/40" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <hr className="my-2 border-[#5e5e5e]/15" />

                        <div className="flex items-center justify-between py-1">
                            <span className="font-medium text-[#616162]/50">Date Requested:</span>
                            <span className="rounded-full bg-[#eff4fb] px-2 py-0.5 font-medium text-[#4784ff]">
                                {req.date}
                            </span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <span className="font-medium text-[#616162]/50">From:</span>
                            <span className="font-medium text-[#5e5e5e]">{req.from}</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <span className="font-medium text-[#616162]/50">Purpose:</span>
                            <span className="font-medium text-[#5e5e5e]">{req.purpose}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
