import { Head } from '@inertiajs/react';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import PageHeading from '@/components/central/page-heading';

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

const card = 'rounded-[5px] border border-[#5e5e5e]/20 bg-white p-5';

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-[11px] text-[#616162]/70">{label}</p>
            <p className="text-[13px] text-[#5e5e5e]">{value}</p>
        </div>
    );
}

export default function CentralProfile() {
    return (
        <>
            <Head title="Profile" />

            <PageHeading title="Profile" subtitle="View your account information" />

            <div className={`${card} flex flex-wrap items-start justify-between gap-6`}>
                <div className="flex items-center gap-5">
                    <div className="flex size-20 items-center justify-center rounded-full bg-[#eff4fb]">
                        <User className="size-9 text-[#4784ff]" />
                    </div>
                    <div>
                        <h2 className="text-[22px] font-semibold text-[#5e5e5e]">Flavio Deza III</h2>
                        <p className="text-[13px] text-[#616162]">Supply Officer</p>
                        <p className="text-[12px] text-[#616162]/80">Bureau of Working Conditions</p>
                        <span className="mt-2 inline-block rounded-full bg-[#eaffe4] px-3 py-0.5 text-[11px] font-medium text-[#26b002]">
                            Active
                        </span>
                    </div>
                </div>

                <div className="space-y-2 border-l border-[#5e5e5e]/15 pl-6 text-[12px] text-[#5e5e5e]">
                    <p className="flex items-center gap-2">
                        <Mail className="size-3.5 text-[#616162]/70" /> fdeza@gmail
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone className="size-3.5 text-[#616162]/70" /> +63 9123456789
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPin className="size-3.5 text-[#616162]/70" /> Calamba City, Laguna, Parian
                    </p>
                </div>
            </div>

            <div className={`${card} mt-5`}>
                <h3 className="mb-4 text-[16px] font-semibold text-[#5e5e5e]">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {personal.map((f) => (
                        <Field key={f.label} {...f} />
                    ))}
                </div>
            </div>

            <div className={`${card} mt-5`}>
                <h3 className="mb-4 text-[16px] font-semibold text-[#5e5e5e]">Work Information</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {work.map((f) => (
                        <Field key={f.label} {...f} />
                    ))}
                </div>
            </div>
        </>
    );
}
