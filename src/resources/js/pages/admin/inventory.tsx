import { Head } from '@inertiajs/react';
import { ArrowUpDown, ListFilter, Search } from 'lucide-react';
import PageHeading from '@/components/admin/page-heading';

type Status = 'In Stock' | 'Low Stock' | 'Out of Stock';

const items: { id: string; name: string; category: string; stock: string; status: Status; modified: string }[] = [
    { id: 'ITM001', name: 'A4 Notebook', category: 'Paper Products', stock: '12 pcs', status: 'In Stock', modified: '2026-02-10' },
    { id: 'ITM002', name: 'Ballpoint Pen (Black)', category: 'Writing Supplies', stock: '8 pcs', status: 'Low Stock', modified: '2026-02-15' },
    { id: 'ITM003', name: 'Binder Clips', category: 'Office Supplies', stock: '45 pcs', status: 'In Stock', modified: '2026-01-28' },
    { id: 'ITM004', name: 'Bond Paper (Short)', category: 'Paper Products', stock: '5 reams', status: 'Low Stock', modified: '2026-02-18' },
    { id: 'ITM005', name: 'Calculator', category: 'Office Equipment', stock: '5 pcs', status: 'In Stock', modified: '2026-01-20' },
    { id: 'ITM006', name: 'Correction Tape', category: 'Writing Supplies', stock: '0 pcs', status: 'Out of Stock', modified: '2026-01-30' },
    { id: 'ITM007', name: 'Envelope (Long)', category: 'Paper Products', stock: '30 pcs', status: 'In Stock', modified: '2026-02-05' },
    { id: 'ITM008', name: 'Folder (Expandable)', category: 'Filing Supplies', stock: '0 pcs', status: 'Out of Stock', modified: '2026-01-25' },
    { id: 'ITM009', name: 'Highlighter', category: 'Writing Supplies', stock: '6 pcs', status: 'Low Stock', modified: '2026-02-12' },
    { id: 'ITM010', name: 'Printer Ink (Black)', category: 'Printing Supplies', stock: '1 pc', status: 'Low Stock', modified: '2026-02-19' },
    { id: 'ITM011', name: 'Stapler', category: 'Office Tools', stock: '4 pcs', status: 'In Stock', modified: '2026-01-18' },
    { id: 'ITM012', name: 'Sticky Notes', category: 'Office Supplies', stock: '0 pads', status: 'Out of Stock', modified: '2026-02-01' },
    { id: 'ITM013', name: 'Whiteboard Marker', category: 'Writing Supplies', stock: '3 pcs', status: 'Low Stock', modified: '2026-02-14' },
    { id: 'ITM014', name: 'Scissors', category: 'Office Tools', stock: '7 pcs', status: 'In Stock', modified: '2026-02-03' },
];

const statusStyle: Record<Status, string> = {
    'In Stock': 'bg-[#eaffe4] text-[#26b002]',
    'Low Stock': 'bg-[#fff8da] text-[#d7ad00]',
    'Out of Stock': 'bg-[#fddddd] text-[#e12e31]',
};

export default function AdminInventory() {
    return (
        <>
            <Head title="Inventory" />

            <PageHeading title="Inventory" subtitle="Mange your inventories here" />

            <h2 className="mb-4 border-b border-[#5e5e5e]/20 pb-3 text-[18px] font-bold text-[#1f1f1f]">
                All Items <span className="text-[#616162]/70">14</span>
            </h2>

            <div className="mb-4 flex items-center gap-2">
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
                            <th className="px-5 py-3 font-medium">Item</th>
                            <th className="font-medium">Category</th>
                            <th className="font-medium">In Stock</th>
                            <th className="font-medium">Status</th>
                            <th className="pr-5 font-medium">Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className="border-t border-[#5e5e5e]/10 hover:bg-[#f6f6f6]/60">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="size-9 rounded border border-[#5e5e5e]/20" />
                                        <div>
                                            <p className="font-semibold text-[#1f1f1f]">{item.name}</p>
                                            <p className="text-[10px] text-[#616162]/70">{item.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.category}</td>
                                <td>{item.stock}</td>
                                <td>
                                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${statusStyle[item.status]}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="pr-5">{item.modified}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
