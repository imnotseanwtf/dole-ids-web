import { Head } from '@inertiajs/react';
import { ImageIcon, ListFilter, MoreVertical, Search } from 'lucide-react';
import PageHeading from '@/components/central/page-heading';

const products = [
    { name: 'Bond Paper (Short)', stock: 20, unit: 'Ream' },
    { name: 'Ballpoint Pen (Black)', stock: 17, unit: 'Box' },
    { name: 'Highlighter', stock: 13, unit: 'Box' },
    { name: 'Folder (Expandable)', stock: 20, unit: 'Pcs' },
    { name: 'Bond Paper (Short)', stock: 20, unit: 'Ream' },
    { name: 'Ballpoint Pen (Black)', stock: 17, unit: 'Box' },
    { name: 'Highlighter', stock: 13, unit: 'Box' },
    { name: 'Ink (Black)', stock: 11, unit: 'Pcs' },
];

export default function CentralCatalog() {
    return (
        <>
            <Head title="Catalog Management" />

            <PageHeading
                title="Catalog Management"
                subtitle="Manage and organize displayed supply items"
            />

            <div className="flex items-center justify-end gap-2 border-t border-[#5e5e5e]/20 pt-4">
                <div className="flex h-7 w-56 items-center gap-2 rounded-[5px] border-[0.2px] border-[#5e5e5e]/50 px-2">
                    <Search className="size-3.5 text-[#5e5e5e]/70" />
                    <input
                        className="w-full bg-transparent text-[10px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/70 focus:outline-none"
                        placeholder="Search by RIS, Item..."
                    />
                </div>
                <button className="flex h-7 items-center gap-1 rounded-[2px] bg-[#f6f6f6] px-3 text-[10px] text-[#5e5e5e]">
                    <ListFilter className="size-3.5" />
                    Filter
                </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((product, i) => (
                    <div
                        key={i}
                        className="overflow-hidden rounded-[2px] border-[0.5px] border-[#5e5e5e]/20 bg-white shadow-[0px_0px_5px_0px_rgba(0,0,0,0.15)]"
                    >
                        <div className="flex aspect-square items-center justify-center bg-[#f6f6f6]">
                            <ImageIcon className="size-10 text-[#5e5e5e]/30" />
                        </div>
                        <div className="px-4 py-3">
                            <p className="text-[10px] font-semibold text-black">{product.name}</p>
                            <p className="flex items-center gap-1 text-[8px] text-[#5e5e5e]">
                                <span className="inline-block size-[5px] rounded-full bg-[#26b002]" />
                                Available
                            </p>
                            <hr className="my-2 border-[#5e5e5e]/20" />
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-[8px] font-semibold text-[#5e5e5e]">Stock</p>
                                    <p className="text-[12px] font-semibold text-black">
                                        {product.stock}{' '}
                                        <span className="text-[8px] text-[#5e5e5e]">{product.unit}</span>
                                    </p>
                                </div>
                                <button>
                                    <MoreVertical className="size-4 text-[#5e5e5e]" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
