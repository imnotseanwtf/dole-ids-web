import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, ImageIcon, Minus, Plus, Trash2 } from 'lucide-react';

// ponytail: static mock matching the Figma (qty fixed at 2, no cart state) —
// same approach as the central/admin frontend-only screens.
const lines = Array.from({ length: 5 }, () => ({ name: 'EPSON 664, CYAN', id: 'ITM0046', qty: 2, unit: 'BOTTLE' }));

const suggestions = ['Copier Paper', 'Ballpoint Pen', 'Binder Clips', 'Epson Ink'];

export default function ProvincialCart() {
    return (
        <div className="px-12 py-6">
            <Head title="Cart" />

            <div className="flex items-center gap-2">
                <Link href="/provincial/catalog" aria-label="Back">
                    <ChevronLeft className="size-5 text-[#1f1f1f]" />
                </Link>
                <h1 className="text-[20px] font-bold text-[#1f1f1f]">Cart (6)</h1>
            </div>

            <div className="mt-5 flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 rounded-lg border border-[#5e5e5e]/15 bg-white">
                    <label className="flex items-center gap-2 border-b border-[#5e5e5e]/10 px-5 py-3 text-[12px]">
                        <input type="checkbox" className="size-4 accent-[#4784ff]" />
                        All
                    </label>
                    {lines.map((line, i) => (
                        <div key={i} className="flex items-center gap-4 border-b border-[#5e5e5e]/10 px-5 py-3 last:border-0">
                            <input type="checkbox" className="size-4 accent-[#4784ff]" />
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-[#5e5e5e]/15 bg-[#f6f6f6]">
                                <ImageIcon className="size-5 text-[#5e5e5e]/30" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[13px] font-medium text-[#1f1f1f]">{line.name}</p>
                                <p className="text-[10px] text-[#5e5e5e]/70">{line.id}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="flex size-6 items-center justify-center rounded bg-[#f0f0f0]"><Minus className="size-3" /></button>
                                <span className="w-5 text-center text-[13px]">{line.qty}</span>
                                <button className="flex size-6 items-center justify-center rounded bg-[#f0f0f0]"><Plus className="size-3" /></button>
                            </div>
                            <span className="w-20 text-[12px] text-[#5e5e5e]">{line.unit}</span>
                            <button aria-label="Remove"><Trash2 className="size-4 text-[#e12e31]" /></button>
                        </div>
                    ))}
                </div>

                <aside className="h-fit w-full rounded-lg border border-[#5e5e5e]/15 bg-white p-4 lg:w-72">
                    <h2 className="text-[14px] font-semibold text-[#1f1f1f]">Request Summary</h2>
                    <div className="mt-3 flex justify-between border-b border-[#5e5e5e]/10 pb-3 text-[12px]">
                        <span className="text-[#5e5e5e]/70">Number of Items:</span>
                        <span className="font-medium text-[#1f1f1f]">5</span>
                    </div>
                    <Link
                        href="/provincial/request-summary"
                        className="mt-4 block w-full rounded-md bg-[#4784ff] py-2 text-center text-[13px] font-medium text-white"
                    >
                        Proceed
                    </Link>
                </aside>
            </div>

            <h2 className="mt-8 text-[16px] font-bold text-[#1f1f1f]">You May Also Like</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {suggestions.map((name, i) => (
                    <div key={i} className="overflow-hidden rounded-lg border border-[#5e5e5e]/15 bg-white">
                        <div className="flex aspect-square items-center justify-center bg-[#f6f6f6]">
                            <ImageIcon className="size-10 text-[#5e5e5e]/30" />
                        </div>
                        <p className="p-3 text-[13px] font-medium text-[#1f1f1f]">{name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
