import { Head, Link, router } from '@inertiajs/react';
import { Building2, Calendar, ChevronLeft, ImageIcon, MapPin, Minus, Network, Plus, SquarePen, Trash2, UserRound } from 'lucide-react';
import { useState } from 'react';

const header = [
    { icon: Building2, label: 'Office/ Branch', value: 'BATANGAS PROVINCIAL OFFICE' },
    { icon: UserRound, label: 'Requested by', value: 'Candy R. Cuenca' },
    { icon: Network, label: 'Department/ Unit', value: 'ADMIN' },
    { icon: Calendar, label: 'Date Requested', value: '04-24-26' },
];

// ponytail: static mock matching the Figma (qty fixed per row) — same as the
// other frontend-only provincial screens.
const lines = [
    { name: 'EPSON 664, CYAN', id: 'ITM0046', qty: 2, unit: 'BOTTLE' },
    { name: 'STAMP PAD INK, BLACK', id: 'ITM0076', qty: 3, unit: 'PC' },
    { name: 'MASKING TAPE, 1"', id: 'ITM0046', qty: 5, unit: 'ROLL' },
    { name: 'HIGHLIGHTER', id: 'ITM0089', qty: 10, unit: 'PC' },
    { name: "BATTERY, AA 4's", id: 'ITM0046', qty: 9, unit: 'PACK' },
];

export default function ProvincialRequestSummary() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="px-12 py-6">
            <Head title="Request Summary" />

            <div className="flex items-center gap-2">
                <Link href="/provincial/cart" aria-label="Back"><ChevronLeft className="size-5 text-[#1f1f1f]" /></Link>
                <h1 className="text-[20px] font-bold text-[#1f1f1f]">Request Summary</h1>
            </div>

            <div className="mt-5 flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                    <div className="flex flex-wrap justify-between gap-4 rounded-md border border-[#5e5e5e]/15 px-4 py-3">
                        {header.map(({ icon: Icon, label, value }) => (
                            <div key={label} className="flex items-center gap-2">
                                <Icon className="size-5 text-[#4784ff]" strokeWidth={1.75} />
                                <div>
                                    <p className="text-[10px] text-[#616162]/70">{label}</p>
                                    <p className="text-[12px] font-medium text-[#1f1f1f]">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 overflow-hidden rounded-md">
                        <table className="w-full text-left text-[12px] text-[#5e5e5e]">
                            <thead>
                                <tr className="bg-[#4784ff] text-[11px] font-medium text-white">
                                    <th className="px-3 py-2 font-medium">No.</th>
                                    <th className="font-medium">Item/s Description</th>
                                    <th className="text-right font-medium">Quantity</th>
                                    <th className="pr-3 text-right font-medium">Unit</th>
                                    <th className="pr-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {lines.map((line, i) => (
                                    <tr key={i} className="border-b border-[#5e5e5e]/10">
                                        <td className="px-3 py-2.5">{i + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-9 shrink-0 items-center justify-center rounded border border-[#5e5e5e]/15 bg-[#f6f6f6]">
                                                    <ImageIcon className="size-4 text-[#5e5e5e]/30" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#1f1f1f]">{line.name}</p>
                                                    <p className="text-[10px] text-[#616162]/70">{line.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="flex size-5 items-center justify-center rounded bg-[#f0f0f0]"><Minus className="size-3" /></button>
                                                <span className="w-4 text-center">{line.qty}</span>
                                                <button className="flex size-5 items-center justify-center rounded bg-[#f0f0f0]"><Plus className="size-3" /></button>
                                            </div>
                                        </td>
                                        <td className="pr-3 text-right">{line.unit}</td>
                                        <td className="pr-3 text-right"><button aria-label="Remove"><Trash2 className="size-4 text-[#e12e31]" /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="py-2 text-right text-[11px] text-[#5e5e5e]/70">See more</p>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 border-t border-[#5e5e5e]/10 pt-4 md:grid-cols-2">
                        <div>
                            <p className="mb-1 text-[12px] text-[#5e5e5e]">Purpose</p>
                            <select className="h-9 w-full rounded-md border border-[#5e5e5e]/20 bg-white px-3 text-[12px] text-[#5e5e5e]">
                                <option>Select</option>
                                <option>Supply</option>
                                <option>Equipment</option>
                            </select>
                        </div>
                        <div>
                            <p className="mb-1 text-[12px] text-[#5e5e5e]">Note (Optional)</p>
                            <input className="h-9 w-full rounded-md border border-[#5e5e5e]/20 bg-white px-3 text-[12px] text-[#5e5e5e] focus:outline-none" />
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-4">
                        <Link href="/provincial/cart" className="text-[13px] text-[#5e5e5e]">Cancel</Link>
                        <button onClick={() => setSubmitted(true)} className="rounded-md bg-[#4784ff] px-6 py-2 text-[13px] font-medium text-white">
                            Submit
                        </button>
                    </div>
                </div>

                <aside className="h-fit w-full rounded-lg border-2 border-[#4784ff]/40 bg-white p-4 lg:w-80">
                    <h2 className="text-[14px] font-semibold text-[#1f1f1f]">Pickup Address</h2>
                    <MapPlaceholder />
                    <p className="mt-2 text-[13px] font-medium text-[#1f1f1f]">Calamba City, Laguna</p>
                    <p className="text-[11px] text-[#5e5e5e]/70">Km 50 Manila S Rd, Real, Calamba, 4029 Laguna, Anderson Building 2</p>

                    <h2 className="mt-4 flex items-center justify-between border-t border-[#5e5e5e]/10 pt-4 text-[14px] font-semibold text-[#1f1f1f]">
                        Destination Branch Address <SquarePen className="size-4 text-[#5e5e5e]/60" />
                    </h2>
                    <p className="mt-1 text-[13px] font-medium text-[#1f1f1f]">Lipa City, Batangas</p>
                    <p className="text-[11px] text-[#5e5e5e]/70">The Olan Place, Brgy. Marawoy</p>

                    <h2 className="mt-4 flex items-center justify-between border-t border-[#5e5e5e]/10 pt-4 text-[14px] font-semibold text-[#1f1f1f]">
                        Contact Information <SquarePen className="size-4 text-[#5e5e5e]/60" />
                    </h2>
                    <p className="mt-1 text-[12px] text-[#5e5e5e]/80">cpo.dole4a@gmail.com</p>
                    <p className="text-[12px] text-[#5e5e5e]/80">(046) 423-3223</p>
                </aside>
            </div>

            {submitted && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40">
                    <div className="w-[330px] rounded-lg bg-white p-6 text-center">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#4784ff] text-white">✓</div>
                        <h3 className="mt-3 text-[16px] font-bold text-[#1f1f1f]">Submitted!</h3>
                        <p className="mt-1 text-[12px] text-[#5e5e5e]">Item request submitted successfully.</p>
                        <button
                            onClick={() => router.visit('/provincial/requests')}
                            className="mt-4 rounded-md bg-[#4784ff] px-8 py-2 text-[13px] font-medium text-white"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ponytail: no map asset/SDK — placeholder tile with a pin. Swap for a real map
// (or the Figma static export) when available.
function MapPlaceholder() {
    return (
        <div className="mt-2 flex h-28 items-center justify-center rounded-md bg-[#eef3fb]">
            <MapPin className="size-6 text-[#e12e31]" />
        </div>
    );
}
