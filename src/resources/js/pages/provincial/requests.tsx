import { Head } from '@inertiajs/react';
import { ArrowUpDown, ImageIcon, ListFilter, Search, X } from 'lucide-react';
import { useState } from 'react';

type Status = 'Pending' | 'Approved' | 'Declined';

const statusStyle: Record<Status, string> = {
    Pending: 'bg-[#fff8da] text-[#d7ad00]',
    Approved: 'bg-[#eaffe4] text-[#26b002]',
    Declined: 'bg-[#fddddd] text-[#e12e31]',
};

type Req = { ris: string; items: string; date: string; purpose: string; status: Status };

const active: Req[] = [
    { ris: 'RIS#2026-04.096', items: 'Epson 664, Cyan...', date: '03-01-26', purpose: 'Supply', status: 'Pending' },
    { ris: 'RIS#2026-04.096', items: 'Epson 664, Cyan...', date: '03-01-26', purpose: 'Supply', status: 'Approved' },
    { ris: 'RIS#2026-04.096', items: 'Epson 664, Cyan...', date: '03-01-26', purpose: 'Supply', status: 'Approved' },
    { ris: 'RIS#2026-04.096', items: 'Epson 664, Cyan...', date: '03-01-26', purpose: 'Supply', status: 'Pending' },
    { ris: 'RIS#2026-04.096', items: 'Epson 664, Cyan...', date: '03-01-26', purpose: 'Supply', status: 'Approved' },
    { ris: 'RIS#2026-04.096', items: 'Epson 664, Cyan...', date: '03-01-26', purpose: 'Supply', status: 'Approved' },
    { ris: 'RIS#2026-04.096', items: 'Epson 664, Cyan...', date: '03-01-26', purpose: 'Supply', status: 'Declined' },
    { ris: 'RIS#2026-04.096', items: 'Epson 664, Cyan...', date: '03-01-26', purpose: 'Supply', status: 'Declined' },
];

const history: { group: string; items: Req[] }[] = [
    { group: 'Today', items: active.slice(0, 6) },
    { group: 'Yesterday', items: active.slice(0, 4) },
];

const detailLines = [
    { name: 'EPSON 664, CYAN', id: 'ITM0046', qty: 2, unit: 'BOTTLE' },
    { name: 'STAMP PAD INK, BLACK', id: 'ITM0076', qty: 3, unit: 'PC' },
    { name: 'MASKING TAPE, 1"', id: 'ITM0046', qty: 5, unit: 'ROLL' },
    { name: 'HIGHLIGHTER', id: 'ITM0089', qty: 10, unit: 'PC' },
    { name: "BATTERY, AA 4's", id: 'ITM0046', qty: 9, unit: 'PACK' },
];

const stages = ['Approved', 'Preparing', 'Shipped', 'Delivered'];

function Card({ r, onClick }: { r: Req; onClick: () => void }) {
    return (
        <button onClick={onClick} className="rounded-lg border border-[#5e5e5e]/15 bg-white p-4 text-left hover:shadow-sm">
            <p className="text-[13px] font-medium text-[#1f1f1f]">{r.ris}</p>
            <div className="mt-3 flex gap-3">
                <div className="size-[70px] shrink-0 rounded-md border border-[#5e5e5e]/15 bg-[#eff4fb]" />
                <div className="flex-1 text-[11px] text-[#5e5e5e]/70">
                    <p>Items: <span className="font-medium text-[#1f1f1f]">{r.items}</span></p>
                    <p className="mt-1">Date Requested: <span className="font-medium text-[#1f1f1f]">{r.date}</span></p>
                    <p className="mt-1">Purpose: <span className="font-medium text-[#1f1f1f]">{r.purpose}</span></p>
                    <p className="mt-1 flex items-center gap-1">
                        Status:
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyle[r.status]}`}>{r.status}</span>
                    </p>
                </div>
            </div>
        </button>
    );
}

export default function ProvincialRequests() {
    const [tab, setTab] = useState<'active' | 'history'>('active');
    const [openReq, setOpenReq] = useState<Req | null>(null);

    return (
        <div className="px-12 py-6">
            <Head title="My Requests" />

            <h1 className="text-[20px] font-bold text-[#1f1f1f]">My Requests</h1>

            <div className="mt-3 flex gap-6 border-b border-[#5e5e5e]/15 text-[14px]">
                <button onClick={() => setTab('active')} className={tab === 'active' ? 'border-b-2 border-[#4784ff] pb-2 font-medium text-[#1f1f1f]' : 'pb-2 text-[#5e5e5e]/60'}>
                    Active (13)
                </button>
                <button onClick={() => setTab('history')} className={tab === 'history' ? 'border-b-2 border-[#4784ff] pb-2 font-medium text-[#1f1f1f]' : 'pb-2 text-[#5e5e5e]/60'}>
                    Request History (106)
                </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
                <div className="flex h-9 w-72 items-center gap-2 rounded-full border border-[#5e5e5e]/20 bg-white px-4">
                    <Search className="size-4 text-[#5e5e5e]/60" />
                    <input className="w-full bg-transparent text-[12px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/60 focus:outline-none" placeholder="Search by RIS, Item..." />
                </div>
                <button className="ml-auto flex h-9 items-center gap-1.5 rounded-md border border-[#5e5e5e]/20 bg-white px-3 text-[12px] text-[#5e5e5e]">Sort <ArrowUpDown className="size-3.5" /></button>
                <button className="flex h-9 items-center gap-1.5 rounded-md border border-[#5e5e5e]/20 bg-white px-3 text-[12px] text-[#5e5e5e]">Filter <ListFilter className="size-3.5" /></button>
            </div>

            {tab === 'active' ? (
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {active.map((r, i) => <Card key={i} r={r} onClick={() => setOpenReq(r)} />)}
                </div>
            ) : (
                history.map(({ group, items }) => (
                    <div key={group} className="mt-4">
                        <p className="mb-3 text-[13px] font-medium text-[#1f1f1f]">{group}</p>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {items.map((r, i) => <Card key={i} r={r} onClick={() => setOpenReq(r)} />)}
                        </div>
                    </div>
                ))
            )}

            {openReq && <RequestModal r={openReq} onClose={() => setOpenReq(null)} />}
        </div>
    );
}

function RequestModal({ r, onClose }: { r: Req; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-6">
            <div className="max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-white p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-[18px] font-bold text-[#1f1f1f]">Request Summary</h2>
                        <p className="mt-1 flex items-center gap-2 text-[13px] text-[#1f1f1f]">
                            {r.ris}
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyle[r.status]}`}>{r.status}</span>
                        </p>
                    </div>
                    <button onClick={onClose} aria-label="Close"><X className="size-5 text-[#5e5e5e]" /></button>
                </div>

                <div className="mt-4 flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1 rounded-lg border-t-2 border-[#4784ff] p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            {stages.map((s) => (
                                <div key={s} className="flex flex-1 flex-col items-center">
                                    <span className="size-6 rounded-full border border-[#5e5e5e]/30" />
                                    <p className="mt-1.5 text-[11px] text-[#1f1f1f]">{s}</p>
                                    <span className="rounded bg-[#f0f0f0] px-1.5 text-[10px] text-[#5e5e5e]/70">Pending</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-[#5e5e5e]/10 pt-4">
                            <h3 className="text-[14px] font-semibold text-[#1f1f1f]">Request Details</h3>
                            <button className="rounded-full bg-[#4784ff] px-3 py-1 text-[11px] font-medium text-white">View PPMP</button>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-y-1 text-[11px] text-[#5e5e5e]/80">
                            <p>Office: <span className="text-[#1f1f1f]">BATANGAS PROVINCIAL OFFICE</span></p>
                            <p>Date Requested: <span className="text-[#1f1f1f]">04-15-26</span></p>
                            <p>Requested by: <span className="text-[#1f1f1f]">Candy R. Cuenca</span></p>
                            <p>Department/ Unit: <span className="text-[#1f1f1f]">ADMIN</span></p>
                        </div>

                        <table className="mt-4 w-full text-left text-[12px] text-[#5e5e5e]">
                            <thead>
                                <tr className="bg-[#4784ff] text-[11px] font-medium text-white">
                                    <th className="px-3 py-2 font-medium">No.</th>
                                    <th className="font-medium">Item/s Description</th>
                                    <th className="text-right font-medium">Quantity</th>
                                    <th className="pr-3 text-right font-medium">Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailLines.map((line, i) => (
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
                                        <td className="text-right">{line.qty}</td>
                                        <td className="pr-3 text-right">{line.unit}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-3 text-[12px] text-[#5e5e5e]">Purpose: <span className="font-medium text-[#1f1f1f] underline">Supply</span></p>
                    </div>

                    <aside className="w-full space-y-4 lg:w-72">
                        <div className="rounded-lg border border-[#5e5e5e]/15 p-4">
                            <p className="text-[13px] font-semibold text-[#1f1f1f]">Note</p>
                            <p className="mt-1 text-[12px] text-[#5e5e5e]/80">Please prepare 30 April, 26.</p>
                            <p className="mt-3 border-t border-[#5e5e5e]/10 pt-3 text-[13px] font-semibold text-[#1f1f1f]">Remarks</p>
                            <input className="mt-1 w-full rounded border border-[#5e5e5e]/20 px-2 py-1 text-[12px]" defaultValue="-" />
                        </div>
                        <div className="rounded-lg border-2 border-[#4784ff]/40 p-4">
                            <p className="text-[13px] font-semibold text-[#1f1f1f]">Pickup Address</p>
                            <p className="mt-1 text-[12px] font-medium text-[#1f1f1f]">Calamba City, Laguna</p>
                            <p className="text-[11px] text-[#5e5e5e]/70">Km 50 Manila S Rd, Real, Calamba, 4029 Laguna, Anderson Building 2</p>
                            <p className="mt-3 border-t border-[#5e5e5e]/10 pt-3 text-[13px] font-semibold text-[#1f1f1f]">Destination Branch Address</p>
                            <div className="mt-2 flex h-24 items-center justify-center rounded-md bg-[#eef3fb]"><ImageIcon className="size-6 text-[#5e5e5e]/30" /></div>
                            <p className="mt-1 text-[12px] font-medium text-[#1f1f1f]">Lipa City, Batangas</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
