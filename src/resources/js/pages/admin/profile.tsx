import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone, SquarePen } from 'lucide-react';
import PageHeading from '@/components/admin/page-heading';

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
    { label: 'Employment Status', value: 'Regular' },
    { label: 'Plantilla Item No.', value: 'DOL-BWC-2026-078' },
    { label: 'Salary Grade', value: 'SG 15' },
    { label: 'Step Increment', value: '3' },
    { label: 'Date Created', value: 'June 5, 2026' },
];

const card = 'rounded-xl border border-[#5e5e5e]/15 bg-white p-5';

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-[11px] text-[#616162]/70">{label}</p>
            <p className="text-[13px] font-medium text-[#1f1f1f]">{value}</p>
        </div>
    );
}

export default function AdminProfile() {
    return (
        <>
            <Head title="Account Settings" />

            <PageHeading title="Account Settings" subtitle="Manage your account" />

            <div className={`${card} relative flex flex-wrap items-start justify-between gap-6`}>
                <button className="absolute right-4 top-4 text-[#5e5e5e]/60">
                    <SquarePen className="size-4" />
                </button>
                <div className="flex items-center gap-5">
                    <span className="size-20 rounded-full bg-[#e2e2e2]" />
                    <div>
                        <h2 className="text-[22px] font-bold text-[#1f1f1f]">Flavio Deza III</h2>
                        <p className="text-[13px] font-medium text-[#4784ff]">Admin</p>
                        <p className="text-[12px] text-[#616162]">Bureau of Working Conditions</p>
                        <p className="text-[12px] text-[#616162]">Department of Labor and Employment</p>
                        <span className="mt-2 inline-block rounded-full bg-[#eaffe4] px-3 py-0.5 text-[11px] font-medium text-[#26b002]">
                            Active
                        </span>
                    </div>
                </div>

                <div className="space-y-2 border-l border-[#5e5e5e]/15 pl-6 text-[12px] text-[#5e5e5e]">
                    <p className="flex items-center gap-2"><Mail className="size-3.5 text-[#616162]/70" /> fdeza@gmail</p>
                    <p className="flex items-center gap-2"><Phone className="size-3.5 text-[#616162]/70" /> +63 9123456789</p>
                    <p className="flex items-center gap-2"><MapPin className="size-3.5 text-[#616162]/70" /> Calamba City, Laguna, Parian</p>
                </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.8fr_1fr]">
                <div className="space-y-5">
                    <div className={card}>
                        <h3 className="mb-4 text-[16px] font-bold text-[#1f1f1f]">Personal Information</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                            {personal.map((f) => (
                                <Field key={f.label} {...f} />
                            ))}
                        </div>
                    </div>

                    <div className={card}>
                        <h3 className="mb-4 text-[16px] font-bold text-[#1f1f1f]">Work Information</h3>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {work.map((f) => (
                                <Field key={f.label} {...f} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={card}>
                    <h3 className="mb-4 text-[16px] font-bold text-[#1f1f1f]">Security Settings</h3>
                    <label className="text-[11px] text-[#616162]/70">
                        Username<span className="text-[#e12e31]">*</span>
                    </label>
                    <input
                        defaultValue="DOL-BWC-2026-078"
                        className="mt-1 w-full border-b border-[#5e5e5e]/30 pb-1 text-[13px] text-[#1f1f1f] focus:outline-none"
                    />
                    <button className="mt-5 w-full rounded-md bg-[#4784ff] py-2 text-[12px] font-medium text-white">
                        Change Password
                    </button>
                </div>
            </div>
        </>
    );
}
