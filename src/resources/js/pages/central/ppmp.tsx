import { Head } from '@inertiajs/react';
import { ChevronDown, Eye, MoreVertical, Search } from 'lucide-react';
import PageHeading from '@/components/central/page-heading';

const filters = [
    { label: 'Fiscal Year', value: 'All' },
    { label: 'Office/ Branch', value: 'All' },
    { label: 'Unit', value: 'All' },
];

const rows = [
    { office: 'Batangas Provincial Office', submitted: 'Mar 3, 2026 3:12 PM' },
    { office: 'Cavite Provincial Office', submitted: 'Mar 3, 2026 3:12 PM' },
    { office: 'Quezon Provincial Office', submitted: 'Mar 3, 2026 3:12 PM' },
    { office: 'Batangas Provincial Office', submitted: 'Mar 3, 2026 3:12 PM' },
    { office: 'Rizal Provincial Office', submitted: 'Mar 3, 2026 3:12 PM' },
    { office: 'Cavite Provincial Office', submitted: 'Mar 3, 2026 3:12 PM' },
    { office: 'Quezon Provincial Office', submitted: 'Mar 3, 2026 3:12 PM' },
];

export default function CentralPpmp() {
    return (
        <>
            <Head title="PPMP Management" />

            <PageHeading title="PPMP Management" subtitle="View system summaries and recent activities" />

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-7 w-56 items-center gap-2 rounded-[5px] border-[0.2px] border-[#5e5e5e]/50 px-2">
                    <Search className="size-3.5 text-[#5e5e5e]/70" />
                    <input
                        className="w-full bg-transparent text-[10px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/70 focus:outline-none"
                        placeholder="Search"
                    />
                </div>

                <span className="ml-2 text-[12px] text-[#5e5e5e]">Filter by:</span>
                {filters.map((f) => (
                    <div
                        key={f.label}
                        className="flex h-8 w-[152px] items-center justify-between rounded-[5px] border-[0.2px] border-[#5e5e5e]/40 px-2"
                    >
                        <div className="leading-tight">
                            <p className="text-[9px] text-[#616162]/70">{f.label}</p>
                            <p className="text-[9px] text-[#5e5e5e]">{f.value}</p>
                        </div>
                        <ChevronDown className="size-3 text-[#5e5e5e]" />
                    </div>
                ))}
            </div>

            <div className="mt-6 border-b border-[#5e5e5e]/20 text-[12px]">
                <span className="inline-block border-b-2 border-[#4784ff] pb-2 font-medium text-[#5e5e5e]">
                    For Approval <span className="font-light">(4)</span>
                </span>
            </div>

            <table className="mt-4 w-full text-left text-[12px] text-[#5e5e5e]">
                <thead>
                    <tr className="text-[10px] text-[#616162]/70">
                        <th className="pb-2 font-medium">Office/ Branch</th>
                        <th className="pb-2 font-medium">Date Submitted</th>
                        <th className="pb-2" />
                        <th className="pb-2" />
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} className="border-t border-[#5e5e5e]/10">
                            <td className="py-2.5">{row.office}</td>
                            <td className="py-2.5">{row.submitted}</td>
                            <td className="py-2.5 text-right">
                                <button className="inline-flex items-center gap-1 rounded-[5px] border border-[#5e5e5e]/30 px-2 py-1 text-[10px]">
                                    <Eye className="size-3" />
                                    View
                                </button>
                            </td>
                            <td className="w-8 py-2.5 text-right">
                                <button>
                                    <MoreVertical className="size-4 text-[#5e5e5e]" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
