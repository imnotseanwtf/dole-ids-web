import { Head } from '@inertiajs/react';
import { CircleUser, Mail, MapPin, Phone, SquarePen } from 'lucide-react';

const personal = [
    { label: 'Full Name', value: 'Flavio Maneclang Deza III' },
    { label: 'Date of Birth', value: 'June 13, 2003' },
    { label: 'Gender', value: 'Male' },
    { label: 'Civil Status', value: 'Single' },
    { label: 'Nationality', value: 'Filipino' },
];

const work = [
    { label: 'Employee ID', value: 'DOLE-2026-00013' },
    { label: 'Position', value: 'Supply Officer' },
    { label: 'Division/ Unit', value: 'Procurement and Supply Division' },
    { label: 'Employment Status', value: 'Filipino' },
    { label: 'Plantilla Item No.', value: 'DOL-BWC-2026-078' },
    { label: 'Salary Grade', value: 'SG 15' },
    { label: 'Step Increment', value: '3' },
    { label: 'Date Created', value: 'June 5, 2026' },
];

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-[11px] text-[#616162]/70">{label}</p>
            <p className="text-[13px] font-medium text-[#1f1f1f]">{value}</p>
        </div>
    );
}

export default function ProvincialProfile() {
    return (
        <div className="px-12 py-6">
            <Head title="Profile" />

            <div className="relative flex flex-col gap-6 rounded-lg border border-[#5e5e5e]/15 bg-white p-6 md:flex-row md:items-center">
                <button className="absolute right-4 top-4 text-[#5e5e5e]/60" aria-label="Edit"><SquarePen className="size-4" /></button>

                <div className="flex items-center gap-5">
                    <div className="flex size-20 items-center justify-center rounded-full bg-[#eff4fb]">
                        <CircleUser className="size-12 text-[#4784ff]/50" strokeWidth={1.25} />
                    </div>
                    <div>
                        <h1 className="text-[22px] font-bold text-[#1f1f1f]">Flavio Deza III</h1>
                        <p className="text-[13px] font-medium text-[#4784ff]">Supply Officer</p>
                        <p className="text-[12px] text-[#5e5e5e]/80">Bureau of Working Conditions</p>
                        <p className="text-[12px] text-[#5e5e5e]/80">Department of Labor and Employment</p>
                        <span className="mt-2 inline-block rounded-full bg-[#eaffe4] px-3 py-0.5 text-[11px] font-medium text-[#26b002]">Active</span>
                    </div>
                </div>

                <div className="space-y-2 text-[12px] text-[#5e5e5e] md:ml-auto md:border-l md:border-[#5e5e5e]/10 md:pl-8">
                    <p className="flex items-center gap-2"><Mail className="size-4 text-[#5e5e5e]/60" /> fdeza@gmail</p>
                    <p className="flex items-center gap-2"><Phone className="size-4 text-[#5e5e5e]/60" /> +63 9123456789</p>
                    <p className="flex items-center gap-2"><MapPin className="size-4 text-[#5e5e5e]/60" /> Calamba City, Laguna, Parian</p>
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 space-y-6">
                    <section className="rounded-lg border border-[#5e5e5e]/15 bg-white p-5">
                        <h2 className="text-[15px] font-bold text-[#1f1f1f]">Personal Information</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
                            {personal.map((f) => <Field key={f.label} {...f} />)}
                        </div>
                    </section>

                    <section className="rounded-lg border border-[#5e5e5e]/15 bg-white p-5">
                        <h2 className="text-[15px] font-bold text-[#1f1f1f]">Work Information</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                            {work.map((f) => <Field key={f.label} {...f} />)}
                        </div>
                    </section>
                </div>

                <aside className="h-fit w-full rounded-lg border border-[#5e5e5e]/15 bg-white p-5 lg:w-80">
                    <h2 className="text-[15px] font-bold text-[#1f1f1f]">Security Settings</h2>

                    <p className="mt-4 text-[12px] text-[#5e5e5e]">Username <span className="text-[#e12e31]">*</span></p>
                    <input
                        defaultValue="DOL-BWC-2026-078"
                        className="mt-1 w-full border-b border-[#5e5e5e]/20 pb-1 text-[13px] font-medium text-[#1f1f1f] focus:outline-none"
                    />

                    <p className="mt-4 text-[12px] text-[#5e5e5e]">Password</p>
                    <input
                        type="password"
                        defaultValue="password1234"
                        className="mt-1 w-full rounded-md border border-[#5e5e5e]/20 px-3 py-2 text-[13px] text-[#1f1f1f] focus:outline-none"
                    />

                    <button className="mt-4 rounded-md bg-[#4784ff] px-4 py-2 text-[12px] font-medium text-white">Change Password</button>
                </aside>
            </div>
        </div>
    );
}
