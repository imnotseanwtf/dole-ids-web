import { Head } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowUpRight,
    Clock,
    MapPin,
    PackageX,
    Repeat,
    TriangleAlert
    
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import PageHeading from '@/components/central/page-heading';

const stats: { label: string; value: string; icon: LucideIcon }[] = [
    { label: 'Requests Today', value: '07', icon: Repeat },
    { label: 'Pending Approvals', value: '15', icon: Clock },
    { label: 'Active Deliveries', value: '03', icon: MapPin },
];

const lowStock = [
    { name: 'Black Ink Cartridges', detail: '3 pcs in Stock', pct: '15%' },
    { name: 'Ballpoint Pens', detail: '10 pcs in Stock', pct: '20%' },
    { name: 'A4 Notebooks', detail: '5 pcs in Stock', pct: '10%' },
    { name: 'Paper Clips', detail: '50 pcs in Stock', pct: '25%' },
    { name: 'Whiteboard Markers', detail: '4 pcs in Stock', pct: '10%' },
];

const outOfStock = [
    { name: 'Printer Paper', detail: '0 reams', pct: '100%' },
    { name: 'Blue Ink Pens', detail: '0 pcs', pct: '100%' },
    { name: 'Staplers', detail: '0 pcs', pct: '100%' },
    { name: 'Sticky Notes', detail: '0 pads', pct: '100%' },
    { name: 'Highlighters', detail: '0 pcs', pct: '100%' },
];

const card = 'rounded-[5px] border border-[#5e5e5e]/30 bg-white';

export default function CentralDashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <PageHeading
                title="Dashboard"
                subtitle="View system summaries and recent activities"
            />

            <div className="grid gap-5 md:grid-cols-3">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className={`${card} relative h-[139px] px-5 py-5`}>
                        <div className="flex items-center gap-2">
                            <Icon className="size-5 text-[#4784ff]" strokeWidth={1.75} />
                            <span className="text-[15px] font-bold text-[#5e5e5e]">{label}</span>
                        </div>
                        <span className="absolute bottom-4 left-5 text-[30px] font-bold text-[#5e5e5e]">
                            {value}
                        </span>
                        <ArrowUpRight className="absolute bottom-5 right-5 size-5 text-[#5e5e5e]" />
                    </div>
                ))}
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
                <StockCard
                    title="Low Stock"
                    subtitle="Items needing restock"
                    icon={<TriangleAlert className="size-7 text-[#f4d03f]" strokeWidth={1.75} />}
                    items={lowStock}
                    pctClass="text-[#f4d03f]"
                />
                <StockCard
                    title="Out of Stock"
                    subtitle="Immediate restock"
                    icon={<PackageX className="size-7 text-[#e12e31]" strokeWidth={1.75} />}
                    items={outOfStock}
                    pctClass="text-[#e12e31]"
                />
            </div>
        </>
    );
}

function StockCard({
    title,
    subtitle,
    icon,
    items,
    pctClass,
}: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    items: { name: string; detail: string; pct: string }[];
    pctClass: string;
}) {
    return (
        <div className={`${card} p-5`}>
            <div className="flex items-start gap-3">
                {icon}
                <div className="flex-1">
                    <h2 className="text-[15px] font-bold text-[#5e5e5e]">{title}</h2>
                    <p className="text-[10px] text-[#616162]/75">{subtitle}</p>
                </div>
                <ArrowUpRight className="size-5 text-[#5e5e5e]" />
            </div>
            <ul className="mt-4">
                {items.map((item) => (
                    <li
                        key={item.name}
                        className="flex items-center justify-between border-t border-[#5e5e5e]/15 py-2 first:border-t-0 text-[12px] text-[#5e5e5e]"
                    >
                        <div>
                            <p>{item.name}</p>
                            <p>{item.detail}</p>
                        </div>
                        <span className={`flex items-center gap-1 text-[15px] ${pctClass}`}>
                            <ArrowDown className="size-3" />
                            {item.pct}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
