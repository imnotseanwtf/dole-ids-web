import { Head, Link } from '@inertiajs/react';
import { ImageIcon, ListFilter, MessageSquare, Minus, Plus, Search, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

type Item = { name: string; available: boolean };

const items: Item[] = [
    { name: 'Bond Paper (Short)', available: true },
    { name: 'Ballpoint Pen (Black)', available: false },
    { name: 'Highlighter', available: true },
    { name: 'Ink (Black)', available: true },
    { name: 'Folder (Expandable)', available: true },
    { name: 'Bond Paper (Long)', available: true },
    { name: 'Whiteboard Marker', available: false },
    { name: 'Binder Clips', available: true },
    { name: 'Stapler', available: true },
    { name: 'Sticky Notes', available: false },
    { name: 'Calculator', available: true },
    { name: 'Scissors', available: true },
];

export default function ProvincialCatalog() {
    const [selected, setSelected] = useState<Item | null>(null);

    return (
        <div className="px-12 py-6">
            <Head title="Supply Catalog" />

            <div className="flex items-center justify-between border-b border-[#5e5e5e]/15 pb-4">
                <h1 className="text-[20px] font-bold text-[#1f1f1f]">Supply Catalog</h1>
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-72 items-center gap-2 rounded-full border border-[#5e5e5e]/20 bg-white px-4">
                        <Search className="size-4 text-[#5e5e5e]/60" />
                        <input
                            className="w-full bg-transparent text-[12px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/60 focus:outline-none"
                            placeholder="Search by RIS, Item..."
                        />
                    </div>
                    <button className="flex h-9 items-center gap-1.5 rounded-md border border-[#5e5e5e]/20 bg-white px-3 text-[12px] text-[#5e5e5e]">
                        Filter <ListFilter className="size-3.5" />
                    </button>
                </div>
            </div>

            <div className="mt-5 flex gap-5">
                <div className={`grid flex-1 gap-4 ${selected ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
                    {items.map((item, i) => (
                        <div key={i} className="overflow-hidden rounded-lg border border-[#5e5e5e]/15 bg-white">
                            <button onClick={() => setSelected(item)} className="flex aspect-square w-full items-center justify-center bg-[#f6f6f6]">
                                <ImageIcon className="size-10 text-[#5e5e5e]/30" />
                            </button>
                            <div className="p-3">
                                <p className="text-[13px] font-medium text-[#1f1f1f]">{item.name}</p>
                                <p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#5e5e5e]/70">
                                    <span className={`size-1.5 rounded-full ${item.available ? 'bg-[#26b002]' : 'bg-[#e12e31]'}`} />
                                    {item.available ? 'Available' : 'Unavailable'}
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                    <button className="flex size-8 shrink-0 items-center justify-center rounded-md border border-[#5e5e5e]/20 text-[#5e5e5e]">
                                        <ShoppingCart className="size-4" />
                                    </button>
                                    <button
                                        onClick={() => setSelected(item)}
                                        className="flex h-8 flex-1 items-center justify-center rounded-md bg-[#4784ff] text-[11px] font-medium text-white"
                                    >
                                        Request Item Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selected && <DetailPanel item={selected} onClose={() => setSelected(null)} />}
            </div>
        </div>
    );
}

function DetailPanel({ item, onClose }: { item: Item; onClose: () => void }) {
    const [qty, setQty] = useState(5);

    return (
        <aside className="h-fit w-[360px] shrink-0 rounded-lg border border-[#5e5e5e]/15 bg-white p-4">
            <div className="flex items-center justify-between">
                <MessageSquare className="size-4 text-[#5e5e5e]/60" />
                <button onClick={onClose} aria-label="Close"><X className="size-4 text-[#5e5e5e]" /></button>
            </div>

            <div className="mt-2 flex aspect-video items-center justify-center rounded-md bg-[#eff4fb]">
                <ImageIcon className="size-12 text-[#5e5e5e]/30" />
            </div>

            <div className="mt-3 flex items-center justify-between">
                <p className="text-[14px] font-semibold text-[#1f1f1f]">{item.name}</p>
                <span className="flex items-center gap-1.5 text-[10px] text-[#5e5e5e]/70">
                    <span className={`size-1.5 rounded-full ${item.available ? 'bg-[#26b002]' : 'bg-[#e12e31]'}`} />
                    {item.available ? 'Available' : 'Unavailable'}
                </span>
            </div>

            <p className="mt-2 text-[11px] text-[#5e5e5e]/80">
                Can use to print documents, reports, resumes, magazines, and forms. Size: Letter 8.5 × 11 inches ; GSM: 70 GSM
            </p>

            <p className="mt-3 text-[11px] text-[#5e5e5e]/70">Category: <span className="text-[#1f1f1f]">Paper Supplies</span></p>
            <p className="text-[11px] text-[#5e5e5e]/70">Unit: <span className="text-[#1f1f1f]">Ream</span></p>

            <p className="mt-3 text-[11px] font-medium text-[#e12e31] underline">Remaining quantity request: 95</p>

            <div className="mt-2 flex items-center justify-between">
                <span className="text-[12px] text-[#5e5e5e]">Quantity</span>
                <div className="flex items-center gap-2">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex size-6 items-center justify-center rounded bg-[#f0f0f0]"><Minus className="size-3" /></button>
                    <span className="w-5 text-center text-[13px]">{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)} className="flex size-6 items-center justify-center rounded bg-[#f0f0f0]"><Plus className="size-3" /></button>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-[#5e5e5e]/10 pt-4">
                <button className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#5e5e5e]/20 text-[#5e5e5e]">
                    <ShoppingCart className="size-4" />
                </button>
                <Link
                    href="/provincial/request-summary"
                    className="flex h-9 flex-1 items-center justify-center rounded-md bg-[#4784ff] text-[12px] font-medium text-white"
                >
                    Request Item Now
                </Link>
            </div>
        </aside>
    );
}
