import { Head } from '@inertiajs/react';
import { ImageIcon, ListFilter, MoreVertical, Plus, Search } from 'lucide-react';
import PageHeading from '@/components/central/page-heading';

type Status = 'In Stock' | 'Low Stock' | 'Out of Stock';

type Item = {
    id: string;
    name: string;
    category: string;
    stock: string;
    status: Status;
    modified: string;
};

const items: Item[] = [
    { id: 'ITM001', name: 'A4 Notebook', category: 'Paper Products', stock: '12 pcs', status: 'In Stock', modified: '2026-02-10' },
    { id: 'ITM002', name: 'Ballpoint Pen (Black)', category: 'Writing Supplies', stock: '8 pcs', status: 'Low Stock', modified: '2026-02-15' },
    { id: 'ITM003', name: 'Binder Clips', category: 'Office Supplies', stock: '45 pcs', status: 'In Stock', modified: '2026-01-28' },
    { id: 'ITM004', name: 'Bond Paper (Short)', category: 'Paper Products', stock: '5 reams', status: 'Low Stock', modified: '2026-02-18' },
    { id: 'ITM005', name: 'Calculator', category: 'Office Equipment', stock: '5 pcs', status: 'In Stock', modified: '2026-01-20' },
    { id: 'ITM006', name: 'Correction Tape', category: 'Writing Supplies', stock: '0 pcs', status: 'Out of Stock', modified: '2026-01-30' },
    { id: 'ITM007', name: 'Envelope (Long)', category: 'Paper Products', stock: '30 pcs', status: 'In Stock', modified: '2026-02-05' },
    { id: 'ITM008', name: 'Folder (Expandable)', category: 'Filing Supplies', stock: '0 pcs', status: 'Out of Stock', modified: '2026-01-25' },
    { id: 'ITM009', name: 'Highlighter', category: 'Writing Supplies', stock: '6 pcs', status: 'Low Stock', modified: '2026-02-12' },
    { id: 'ITM0010', name: 'Printer Ink (Black)', category: 'Printing Supplies', stock: '1 pc', status: 'Low Stock', modified: '2026-02-19' },
    { id: 'ITM0011', name: 'Stapler', category: 'Office Tools', stock: '4 pcs', status: 'In Stock', modified: '2026-01-18' },
    { id: 'ITM0012', name: 'Sticky Notes', category: 'Office Supplies', stock: '0 pads', status: 'Out of Stock', modified: '2026-02-01' },
    { id: 'ITM0013', name: 'Whiteboard Marker', category: 'Writing Supplies', stock: '3 pcs', status: 'Low Stock', modified: '2026-02-14' },
];

const tabs = [
    { label: 'All', count: 13 },
    { label: 'In Stock', count: 2 },
    { label: 'Low Stock', count: 3 },
    { label: 'Out of Stock', count: 2 },
];

const statusStyle: Record<Status, string> = {
    'In Stock': 'bg-[#eaffe4] text-[#26b002]',
    'Low Stock': 'bg-[#fff8da] text-[#d7ad00]',
    'Out of Stock': 'bg-[#fddddd] text-[#e12e31]',
};

export default function CentralInventory() {
    return (
        <>
            <Head title="Inventory" />

            <PageHeading title="Inventory" subtitle="View and maintain inventory item records" />

            <div className="flex items-center gap-6 text-[12px]">
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
                <button className="ml-auto flex h-7 items-center gap-1 rounded-[2px] bg-[#4784ff] px-3 text-[10px] font-semibold text-white">
                    <Plus className="size-3" />
                    Add Item
                </button>
                <button className="flex size-7 items-center justify-center rounded-[2px] bg-[#f6f6f6]">
                    <ListFilter className="size-3.5 text-[#5e5e5e]" />
                </button>
            </div>

            <div className="mt-4 overflow-x-auto rounded-[15px]">
                <table className="w-full min-w-[860px] text-left text-[12px] text-[#5e5e5e]">
                    <thead>
                        <tr className="rounded-[5px] bg-[#f6f6f6] text-[10px] font-medium">
                            <th className="py-2.5 pl-3 font-medium">Item</th>
                            <th className="font-medium">Category</th>
                            <th className="font-medium">In Stock</th>
                            <th className="font-medium">Status</th>
                            <th className="font-medium">Last Modified</th>
                            <th className="font-medium">Manage Stock</th>
                            <th className="pr-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-b border-[#5e5e5e]/10 hover:bg-[#f6f6f6]/60">
                                <td className="py-2 pl-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-[35px] shrink-0 items-center justify-center rounded-[5px] border-[0.5px] border-[#616162]/50">
                                            <ImageIcon className="size-4 text-[#616162]/40" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-[10px] text-[#5e5e5e]/80">{item.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.category}</td>
                                <td>{item.stock}</td>
                                <td>
                                    <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${statusStyle[item.status]}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>{item.modified}</td>
                                <td>
                                    <button className="h-[22px] rounded-[5px] bg-[#4784ff] px-3 text-[10px] font-medium text-white">
                                        Update Stock
                                    </button>
                                </td>
                                <td className="pr-3">
                                    <button>
                                        <MoreVertical className="size-4 text-[#5e5e5e]" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
