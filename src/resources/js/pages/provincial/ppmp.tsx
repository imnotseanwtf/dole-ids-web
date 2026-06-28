import { Head } from '@inertiajs/react';
import { Download, Eye, FileText, Info, Search, Upload, UploadCloud } from 'lucide-react';

type Row = { year: string; date: string; status: 'Active' | 'Inactive'; approval: 'Approved' | 'Rejected' };

const rows: Row[] = [
    { year: '2026', date: 'Mar 3, 2026', status: 'Active', approval: 'Approved' },
    { year: '2026', date: 'Mar 3, 2026', status: 'Inactive', approval: 'Rejected' },
    { year: '2026', date: 'Mar 3, 2026', status: 'Inactive', approval: 'Approved' },
    { year: '2025', date: 'Mar 3, 2025', status: 'Inactive', approval: 'Approved' },
    { year: '2025', date: 'Mar 3, 2025', status: 'Inactive', approval: 'Rejected' },
    { year: '2024', date: 'Mar 3, 2024', status: 'Inactive', approval: 'Approved' },
    { year: '2024', date: 'Mar 3, 2024', status: 'Inactive', approval: 'Approved' },
];

export default function ProvincialPpmp() {
    return (
        <div className="px-12 py-6">
            <Head title="PPMP Management" />

            <h1 className="border-b border-[#5e5e5e]/15 pb-4 text-[20px] font-bold text-[#1f1f1f]">PPMP Management</h1>

            <div className="mt-5 flex flex-col gap-6 lg:flex-row">
                <div className="flex-1">
                    <div className="flex flex-wrap gap-6">
                        <div>
                            <p className="mb-1 text-[12px] font-medium text-[#1f1f1f]">Search PPMP</p>
                            <div className="flex h-9 w-72 items-center gap-2 rounded-md border border-[#5e5e5e]/20 bg-white px-3">
                                <Search className="size-4 text-[#5e5e5e]/60" />
                                <input
                                    className="w-full bg-transparent text-[12px] text-[#5e5e5e] placeholder:text-[#5e5e5e]/60 focus:outline-none"
                                    placeholder="Search by file name or year"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="mb-1 text-[12px] font-medium text-[#1f1f1f]">Filter Year</p>
                            <select className="h-9 w-56 rounded-md border border-[#5e5e5e]/20 bg-white px-3 text-[12px] text-[#5e5e5e]">
                                <option>All Years</option>
                                <option>2026</option>
                                <option>2025</option>
                                <option>2024</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-lg border border-[#5e5e5e]/15">
                        <table className="w-full text-left text-[12px] text-[#5e5e5e]">
                            <thead>
                                <tr className="bg-[#eff4fb] text-[11px] font-medium">
                                    <th className="px-4 py-2.5 font-medium">Year</th>
                                    <th className="font-medium">File Name</th>
                                    <th className="font-medium">Date Uploaded</th>
                                    <th className="font-medium">Status</th>
                                    <th className="font-medium">Approval</th>
                                    <th className="pr-4 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r, i) => (
                                    <tr key={i} className="border-t border-[#5e5e5e]/10">
                                        <td className="px-4 py-3 font-medium text-[#1f1f1f]">{r.year}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FileText className="size-5 text-[#e12e31]" />
                                                <div>
                                                    <p className="text-[#1f1f1f]">PPMP_March.pdf</p>
                                                    <p className="text-[10px] text-[#616162]/70">1.24 MB</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="text-[#1f1f1f]">{r.date}</p>
                                            <p className="text-[10px] text-[#616162]/70">12:15 PM</p>
                                        </td>
                                        <td>
                                            {r.status === 'Active' ? (
                                                <span>
                                                    <span className="rounded-full bg-[#eaffe4] px-2 py-0.5 text-[10px] font-medium text-[#26b002]">Active</span>
                                                    <p className="mt-0.5 text-[9px] text-[#616162]/70">Current PPMP</p>
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-[#f0f0f0] px-2 py-0.5 text-[10px] font-medium text-[#5e5e5e]/70">Inactive</span>
                                            )}
                                        </td>
                                        <td className={r.approval === 'Approved' ? 'text-[#26b002]' : 'text-[#e12e31]'}>{r.approval}</td>
                                        <td className="pr-4">
                                            <div className="flex items-center gap-2">
                                                <button className="flex items-center gap-1 rounded border border-[#4784ff]/40 px-2 py-1 text-[10px] text-[#4784ff]">
                                                    <Eye className="size-3.5" /> View
                                                </button>
                                                <button className="flex size-7 items-center justify-center rounded border border-[#5e5e5e]/20 text-[#5e5e5e]">
                                                    <Download className="size-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <aside className="h-fit w-full rounded-lg border border-[#5e5e5e]/15 bg-white p-5 lg:w-80">
                    <h2 className="text-[16px] font-bold text-[#1f1f1f]">Upload PPMP</h2>

                    <p className="mt-4 text-[12px] font-medium text-[#1f1f1f]">Fiscal Year <span className="text-[#e12e31]">*</span></p>
                    <select className="mt-1 h-9 w-full rounded-md border border-[#5e5e5e]/20 bg-white px-3 text-[12px] text-[#5e5e5e]">
                        <option>All Years</option>
                        <option>2026</option>
                        <option>2025</option>
                    </select>

                    <p className="mt-4 text-[12px] font-medium text-[#1f1f1f]">Select File <span className="text-[#e12e31]">*</span></p>
                    <label className="mt-1 flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#5e5e5e]/30 text-[12px] text-[#5e5e5e]/70">
                        <UploadCloud className="size-7 text-[#5e5e5e]/50" />
                        Choose File
                        <input type="file" accept="application/pdf" className="hidden" />
                    </label>

                    <button className="mt-4 ml-auto flex items-center gap-2 rounded-md bg-[#4784ff] px-4 py-2 text-[12px] font-medium text-white">
                        <Upload className="size-4" /> Upload PPMP
                    </button>

                    <div className="mt-4 flex gap-2 rounded-md bg-[#eff4fb] p-3 text-[11px] text-[#5e5e5e]">
                        <Info className="size-4 shrink-0 text-[#4784ff]" />
                        <span><span className="font-medium text-[#1f1f1f]">Note</span><br />Only PDF files are allowed. Maximum file size is xxMB.</span>
                    </div>
                </aside>
            </div>
        </div>
    );
}
